const jwt = require('jsonwebtoken');
const socketio = require('socket.io');
const jwtDecode = require('./util.js');
const UserModel = require('./models/UserModel.js');
const ServerModel = require('./models/ServerModel.js');
let io;

start = (app) => {
  io = socketio(app, { cors: { origin: process.env.NODE_ENV ? "https://skid.rocks" : "http://localhost:3000", methods: ["GET", "POST"] }});

  io.use((socket, next) => {
    const jwtToken =
      socket.handshake.auth.token ||
      socket.handshake.query.token ||
      socket.handshake.token;
    if (!jwtToken) return next(new Error("Not Authorised"));
  
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error("Not Authorised"));
      next();
    });
  });
  
  io.on("connection", (socket) => {
    socket.on('userOnline', async () => {
      socket.join("main");

      const jwtToken = socket.handshake.auth.token || socket.handshake.query.token || socket.handshake.token;
      const tokenUsername = jwtDecode.getUsernameFromToken(jwtToken);
      const foundUser = await UserModel.findOne({ username: tokenUsername });
      if (!foundUser) return;

      let allChannelIds = []
      for (const joinedServerId of foundUser.joinedServers) {
        let _ids = [];
        const joinedServer = await ServerModel.findById(joinedServerId);
        if (!joinedServer) return
        joinedServer.allCategorys.forEach(category => {
          category.allChannels.forEach(channel => {
            _ids.push(channel.id)
          })
        })

        allChannelIds = _ids;
      }

      allChannelIds.forEach(id => {
        socket.join(id);
      })
    });

    socket.on("sendMessage", (message) => {
      try {
        if (message.data)
          socket.nsp.to(message.data.messageChannel).emit("loadMessage", message.data);
      } catch {}
    });
  
    socket.on("deleteServer", (sId) => {
      io.to("main").emit("deleteServer", sId);
    });
  
    socket.on("createServer", () => {
      io.to("main").emit("createServer");
    });
  });
}

module.exports = { start, io };