const socketio = require('socket.io');
const jsonwebtoken = require('jsonwebtoken');

const { get } = require('./secret.js');
const { jwtSocket } = require('./jwt.js');

const UserModel = require('../models/user/UserModel.js');
const OtherModel = require('../models/other/OtherModel.js');

const startSocketServer = (app, callback) => {
    const io = socketio(app, { cors: { origin: process.env.PROD ? "https://app.skid.today" : "http://localhost:3000", methods: ["GET", "POST"] }})
        .use(jwtSocket)
        .on('connection', async (socket) => {
            const secret = await get();
            const jwtToken = socket.handshake.auth.token || socket.handshake.query.token || socket.handshake.token;
            const foundUserDataFromJWT = await jsonwebtoken.verify(jwtToken, secret.secret);
            if (!foundUserDataFromJWT.data);
            
            const foundUser = await UserModel.findOne({ username: foundUserDataFromJWT.data.username, password: foundUserDataFromJWT.data.password });
            if (!foundUser) return;
            
            for (server of foundUser.servers) {
                socket.join(server);
            }
            
            const allThings = await OtherModel.find({});
            const globalServerId = allThings.filter((thing) => thing.global)[0];
            
            foundUser.online = true;
            foundUser.save(err => {});
            
            socket.join('main');
            socket.join(globalServerId.global);
            socket.join(foundUserDataFromJWT.data._id);
            
            socket.to('main').emit('online', { id: foundUser._id, username: foundUser.username, servers: foundUser.servers });

            socket.on('disconnect', async () => {
                const secret = await get();
                const jwtToken = socket.handshake.auth.token || socket.handshake.query.token || socket.handshake.token;
                if (!jwtToken) return;
                const foundUserDataFromJWT = await jsonwebtoken.verify(jwtToken, secret.secret);
                if (!jwtToken) return;

                const foundUser = await UserModel.findOne({ username: foundUserDataFromJWT.data.username, password: foundUserDataFromJWT.data.password });
                if (!foundUser) return;

                foundUser.online = false;
                foundUser.save(err => {});

                socket.to('main').emit('offline', { id: foundUser._id, username: foundUser.username, servers: foundUser.servers });
            });
            socket.on('newFriend', (friendName, user) => {
                io.to("main").emit('refreshFriends', friendName, user);
            });
            socket.on('message', (message) => {
                let msg = message;
                try {
                    msg = JSON.parse(msg);
                } catch (e) {  }
                io.to(msg.server).emit('message', msg);
            });
            socket.on('messageFriend', (message) => {
                let msg = message;
                try {
                    msg = JSON.parse(msg);
                } catch (e) {  };
                io.to(msg.friend).emit('messageFriend', msg);
            });
            socket.on("deleteServer", (serverId) => {
                io.to("main").emit("deleteServer", serverId);
            });
        });
    io && callback();
}

exports.io = startSocketServer;