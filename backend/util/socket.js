const socketio = require('socket.io');
const jsonwebtoken = require('jsonwebtoken');

const { get } = require('./secret.js');
const { jwtSocket } = require('./jwt.js');

const UserModel = require('../models/user/UserModel.js');
const OtherModel = require('../models/other/OtherModel.js');

const startSocketServer = (app, callback) => {
    const io = socketio(app, { cors: { origin: process.env.PROD ? "https://skid.today" : "http://localhost:3000", methods: ["GET", "POST"] }})
        .use(jwtSocket)
        .on('connection', (socket) => {
            socket.on('online', async () => {
                socket.join('main');
                const secret = await get();
                const jwtToken = socket.handshake.auth.token || socket.handshake.query.token || socket.handshake.token;
                const foundUserDataFromJWT = await jsonwebtoken.verify(jwtToken, secret.secret);
                
                const foundUser = await UserModel.findOne({ username: foundUserDataFromJWT.data.username, password: foundUserDataFromJWT.data.password });
                if (!foundUser) return;

                for (server of foundUser.servers) {
                    socket.join(server);
                }

                const allThings = await OtherModel.find({});
                const globalServerId = allThings.filter((thing) => thing.global)[0];
                socket.join(globalServerId.global);

                foundUser.online = true;
                foundUser.save();

                socket.to('main').emit('online', { id: foundUser._id, username: foundUser.username, servers: foundUser.servers });
            });
            socket.on('disconnect', async () => {
                const secret = await get();
                const jwtToken = socket.handshake.auth.token || socket.handshake.query.token || socket.handshake.token;
                const foundUserDataFromJWT = await jsonwebtoken.verify(jwtToken, secret.secret);
                
                const foundUser = await UserModel.findOne({ username: foundUserDataFromJWT.data.username, password: foundUserDataFromJWT.data.password });
                if (!foundUser) return;

                foundUser.online = false;
                foundUser.save();

                socket.to('main').emit('offline', { id: foundUser._id, username: foundUser.username, servers: foundUser.servers });
            });
            socket.on('message', (message) => {
                if (!message._id) return;
                io.to(message.server).emit('message', message);
            });
            socket.on("deleteServer", (serverId) => {
                io.to("main").emit("deleteServer", serverId);
            });
        });
    io && callback();
}

exports.io = startSocketServer;