const express = require('express');
const apiRouter = express.Router();
const UserModel = require('../models/UserModel.js');
const ServerModal = require('../models/ServerModel.js')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwtMiddleware = (req, res, next) => {
    const jwtToken = req.headers['x-auth-token'];
    if (!jwtToken) return res.sendStatus(401);

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(401);

        req.user = decoded.data;
        next();
    })
}

// App Endpoints

apiRouter.post('/app/addserver', jwtMiddleware, (req, res) => {
    const { serverName } = req.body;
    const user = req.user

    const newServer = { 
        serverName, 
        serverOwner: user.userId, 
        allCategorys: [
            { 
                categoryName: 'Text Channels',
                allChannels: [
                    {
                        channelName: 'general',
                        allMessages: []
                    }
                ]
            }
        ]
    }

    ServerModal.create(newServer, (err, result) => {
        if (err || !result) return res.sendStatus(500);

        // require('../socket.js').io.emit('createServer', result)
        res.send(result);
    });
});

apiRouter.post('/app/changePfp', jwtMiddleware, async (req, res) => {
    const { url, jwt: newjwt } = req.body;
    if (!url || !newjwt) return res.sendStatus(400);

    jwt.verify(newjwt, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(401);

        console.log(decoded.data.userId)
        let user = await UserModel.findById(decoded.data.userId)
        if (!user) return res.sendStatus(500);

        user.profileUrl = url;
        user.save()

        console.log(user)

        req.session.user = sign(user);
        res.json({ jwt: sign(user) });
    });
});

apiRouter.get('/app/getservers', jwtMiddleware, (req, res) => {
    ServerModal.find({}, (err, result) => {
        if (err || !result) return res.sendStatus(500);
        res.send(result.reverse());
    });
});

apiRouter.get('/app/getserver', jwtMiddleware, async (req, res) => {
    const _id = req.query.sid;
    ServerModal.findById(_id, (err, result) => {
        if (err || !result) return res.sendStatus(500);
        res.send(result);
    });
});

apiRouter.post('/app/deleteserver', jwtMiddleware, async (req, res) => {
    const serverId = req.body.serverId;

    const server = await ServerModal.findByIdAndRemove(serverId);
    if (!server) return res.sendStatus(500);
    const allServers = await ServerModal.find({});

    return allServers
});

apiRouter.post('/app/addmessage', jwtMiddleware, async (req, res) => {
    const { serverId, channelId, messageContent } = req.body;
    if (!serverId || !channelId || !messageContent) return res.sendStatus(500);
    user = req.user;

    const profilePicture = user.pfpUrl || user.profileUrl

    const server = await ServerModal.findById(serverId);
    if (!server) return res.sendStatus(500);

    var channel
    for (let i = 0; i < server.allCategorys.length; i++) {
        if (server.allCategorys[i].allChannels.find((c) => c.id === channelId)) channel = server.allCategorys[i].allChannels.find((c) => c.id === channelId)
    }

    let isSmall = false
    if (channel.allMessages[0]) {
        let lastmessage = channel.allMessages[0]
        if (((new Date(Date.now()).getTime() - new Date(lastmessage.messageCreation).getTime()) < 300000) && (lastmessage.messageUserId === user.userId)) {
            isSmall = true
        }
    }

    const newMessage = {
        messageOwner: user.username,
        messageUserId: user.userId,
        messageContent,
        messageCreation: Date.now(),
        messageChannel: channelId,
        isSmall,
        profilePicture
    }

    channel.allMessages = [newMessage, ...channel.allMessages];
    server.save();

    res.send(newMessage);
})

apiRouter.post('/app/pseudomessage', jwtMiddleware, async (req, res) => {
    const { serverId, channelId, messageContent } = req.body;
    if (!serverId || !channelId || !messageContent) return res.sendStatus(500);
    user = req.user;

    const profilePicture = user.pfpUrl || user.profileUrl

    const server = await ServerModal.findById(serverId);
    if (!server) return res.sendStatus(500);

    var channel
    for (let i = 0; i < server.allCategorys.length; i++) {
        if (server.allCategorys[i].allChannels.find((c) => c.id === channelId)) channel = server.allCategorys[i].allChannels.find((c) => c.id === channelId)
    }

    let isSmall = false
    if (channel.allMessages[0]) {
        let lastmessage = channel.allMessages[0]
        if (((new Date(Date.now()).getTime() - new Date(lastmessage.messageCreation).getTime()) < 300000) && (lastmessage.messageUserId === user.userId)) {
            isSmall = true
        }
    }

    const newMessage = {
        messageOwner: user.username,
        messageUserId: user.userId,
        messageContent,
        messageCreation: Date.now(),
        messageChannel: channelId,
        isSmall,
        profilePicture
    }

    res.send(newMessage);
})

apiRouter.get('/app/getchannel', jwtMiddleware, async (req, res) => {
    const _sid = req.query.sid;
    const _cid = req.query.cid;

    if (!_sid || !_cid) return res.sendStatus(500);

    const server = await ServerModal.findById(_sid);
    if (!server) return res.sendStatus(500);
    var channel
    for (let i = 0; i < server.allCategorys.length; i++) {
        if (server.allCategorys[i].allChannels.find((c) => c.id === _cid)) channel = server.allCategorys[i].allChannels.find((c) => c.id === _cid)
    }
    
    res.send(channel);
})

apiRouter.post('/app/addcategory', jwtMiddleware, async (req, res) => {
    const { sId, categoryName } = req.body;
    if (!sId || !categoryName) return res.sendStatus(500);

    const newCategory = {
        categoryName,
        allChannels: []
    }
    
    const server = await ServerModal.findById(sId);
    if (!server) return res.sendStatus(500);
    server.allCategorys.push(newCategory);

    server.save();
    res.send(newCategory);
});

apiRouter.post('/app/addchannel', jwtMiddleware, async (req, res) => {
    const { sId, categoryId, channelName } = req.body;
    if (!sId || !categoryId || !channelName) return res.sendStatus(500);

    const newChannel = {
        channelName,
        allMessages: []
    }
    
    const server = await ServerModal.findById(sId);
    if (!server) return res.sendStatus(500);
    const category = server.allCategorys.find((c) => c.id === categoryId);
    if (!category) return res.sendStatus(500);

    category.allChannels.push(newChannel);

    server.save();
    res.send(server);
});

// Auth Endpoints

apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);
    const hashedPassword = hash(password);


    UserModel.findOne({ username, password: hashedPassword }, (err, result) => {
        if (err || !result) return res.sendStatus(403);
        if (hash(password) !== result.password) return res.sendStatus(403);

        req.session.user = sign(result);
        res.json({ jwt: sign(result) });
    });
});

apiRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);
    const hashedPassword = hash(password);

    UserModel.create({ username, password: hashedPassword }, (err, result) => {
        if (err || !result) return res.sendStatus(500);

        req.session.user = sign(result);
        res.json({ jwt: sign(result) });
    });
});

const hash = (inp) => { 
    return crypto.createHash('sha256')
        .update(inp)
        .digest('hex');
}

const sign = (props) => {
    return jwt.sign({
        exp: 999999999999,
        data: { username: props.username, userRole: props.userRole, userId: props.id, profileUrl: props.profileUrl }
    }, process.env.JWT_SECRET);
}

module.exports = apiRouter;