// will rework at a later point
// 08/04/2022

const express = require('express');
const apiRouter = express.Router();
const UserModel = require('../models/UserModel.js');
const ServerModal = require('../models/ServerModel.js')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config.json');
const InviteModel = require('../models/InviteModel.js');

const jwtMiddleware = (req, res, next) => {
    const jwtToken = req.headers['x-auth-token'];
    if (!jwtToken) return res.sendStatus(401);

    jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(401);
        const user = await UserModel.findOne({ username: decoded.data.username })
        if (!user) return res.sendStatus(401);
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

    ServerModal.create(newServer, async (err, result) => {
        if (err || !result) return res.sendStatus(500);
        const ownerUser = await UserModel.findById(user.userId);
        if (!ownerUser) return res.sendStatus(500);

        ownerUser.joinedServers.push(result.id)
        ownerUser.save();

        res.send(result);
    });
});

apiRouter.post('/app/changePfp', jwtMiddleware, async (req, res) => {
    const { url, jwt: newjwt } = req.body;
    if (!url || !newjwt) return res.sendStatus(400);

    jwt.verify(newjwt, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(401);
        let user = await UserModel.findById(decoded.data.userId)
        if (!user) return res.sendStatus(500);

        user.profileUrl = url;
        user.save()

        req.session.user = sign(user);
        res.json({ jwt: sign(user) });
    });
});

apiRouter.get('/app/getservers', jwtMiddleware, async (req, res) => {
    const allUserServers = await getUserServers(req.user);
    res.send(allUserServers);
});

apiRouter.get('/app/getserver', jwtMiddleware, async (req, res) => {
    const _id = req.query.sid;
    const server = await ServerModal.findById(_id);
    if (!server)return res.sendStatus(500);
    res.send(server);
});

apiRouter.post('/app/deleteserver', jwtMiddleware, async (req, res) => {
    const serverId = req.body.serverId;
    if (!serverId || serverId === config.globalServer) return res.sendStatus(500);
    const server = await ServerModal.findByIdAndRemove(serverId);
    if (!server) return res.sendStatus(500);

    let allUsers = await UserModel.find({})
    allUsers = allUsers.filter(user => user.joinedServers.includes(serverId));
    if (!allUsers) return res.sendStatus(500);
    for (const user of allUsers) {
        const foundUser = await UserModel.findOne({ username: user.username })
        foundUser.joinedServers = foundUser.joinedServers.filter(joinedServerId => joinedServerId !== serverId)
        foundUser.save();
    }

    const allServers = await getUserServers(req.user);
    res.send(allServers);
});

apiRouter.post('/app/createInvite', jwtMiddleware, async (req, res) => {
    let { serverId, inviteCode } = req.body;
    if (!serverId) return res.sendStatus(400);

    inviteCode = inviteCode.replace(/\s+/g, '-')

    const foundInvite = await InviteModel.findOne({ serverId })
    if (foundInvite) return res.send(foundInvite);

    const newInvite = await InviteModel.create({
        inviteCode: inviteCode || generateRandomInviteCode(),
        serverId: serverId
    });

    res.send(newInvite);
});

apiRouter.post('/app/hasInvite', jwtMiddleware, async (req, res) => {
    const { serverId } = req.body;
    if (!serverId) return res.sendStatus(400);

    const foundInvite = await InviteModel.findOne({ serverId })
    if (foundInvite) return res.send(foundInvite);

    res.send({ serverId, inviteCode: false });
});

apiRouter.post('/app/hasInviteFromCode', async (req, res) => {
    const { inviteCode } = req.body;
    console.log(inviteCode)
    if (!inviteCode) return res.sendStatus(400);

    const foundInvite = await InviteModel.findOne({ inviteCode })
    if (!foundInvite) return res.sendStatus(400);

    const foundServer = await ServerModal.findById(foundInvite.serverId);
    if (!foundServer) return res.sendStatus(400);

    

    res.send(foundServer);
});

apiRouter.post('/app/joinInvite', jwtMiddleware, async (req, res) => {
    const { inviteCode } = req.body;
    if (!inviteCode) return res.sendStatus(400);

    const foundInvite = await InviteModel.findOne({ inviteCode })
    if (!foundInvite) return res.sendStatus(400); //code invalid

    const foundUser = await UserModel.findOne({ username: req.user.username });
    if (!foundUser) return res.sendStatus(403);

    const foundServer = await ServerModal.findById(foundInvite.serverId);
    if (!foundServer) return res.sendStatus(400);

    foundUser.joinedServers.push(foundInvite.serverId);
    foundUser.save();

    res.send(foundServer);
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
        messageServerId: serverId,
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
        messageServerId: serverId,
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

    UserModel.create({ username, password: hashedPassword, joinedServers: [config.globalServer] }, (err, result) => {
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
  return jwt.sign({ exp: 999999999999, data: {
            username: props.username,
            userRole: props.userRole,
            userId: props.id,
            profileUrl: props.profileUrl,
        },
    }, process.env.JWT_SECRET);
};

generateRandomInviteCode = () => {
    const inviteCode = hash((Math.random() * 10).toString()).slice(1, 7)
    return inviteCode;
}

const getUserServers = async (user) => {
    const foundUser = await UserModel.findOne({ username: user.username });
    let allUserServers = [];

    for (const serverId of foundUser.joinedServers) {
        const foundServer = await ServerModal.findById(serverId);
        allUserServers.push(foundServer);
    }

    return allUserServers;
}

module.exports = apiRouter;