const jwt = require('jsonwebtoken');
const socketio = require('socket.io');

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
    socket.on("joinChannel", (id) => {
      socket.leaveAll();
      socket.join("main");
      socket.join(id);
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