const socketio = require('socket.io');

const { jwtSocket } = require('./jwt.js');

const UserModel = require('../models/user/UserModel.js');

const startSocketServer = (app, callback) => {
    const io = socketio(app, { cors: { origin: process.env.PROD ? "https://skid.today" : "http://localhost:3000", methods: ["GET", "POST"] }})
        .use(jwtSocket)
        .on('conection', (socket) => {
            socket.on('online', async ({ username, password, servers, id }) => {
                socket.join('main');

                const foundUser = await UserModel.findOne({ username, password });
                if (!foundUser) return;

                foundUser.online = true;
                foundUser.save();

                socket.to('main').emit('online', { id, servers })
            });
            socket.on('message', ({ data }) => {
                io.to(data.server).emit('message', data);
            });
            socket.on("deleteServer", (sId) => {
                io.to("main").emit("deleteServer", sId);
            });
        });
    io && callback();
}

exports.io = startSocketServer;