const socketio = require('socket.io');

const { jwtSocket } = require('./jwt.js');

const UserModel = require('../models/user/UserModel.js');

const startSocketServer = (app, callback) => {
    const io = socketio(app, { cors: { origin: process.env.PROD ? "https://skid.today" : "http://localhost:3000", methods: ["GET", "POST"] }})
        .use(jwtSocket)
        .on('connection', (socket) => {
            socket.on('online', async ({ username, password }) => {
                socket.join('main');

                const foundUser = await UserModel.findOne({ username, password });
                if (!foundUser) return;

                for (server of foundUser.servers) {
                    socket.join(server);
                }

                // foundUser.online = true;
                // foundUser.save();

                // socket.to('main').emit('online', { id, servers })
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