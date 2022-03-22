require('dotenv').config();
const express = require('express');
const mongooose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const path = require('path');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io');
const api = require('./routes/api.js');
const ServerModel = require('./models/ServerModel.js')

;(async () => {
  await mongooose.connect(process.env.MONGODB);

  const app = express()
    .use(cors({
      origin: (origin, callback) => { if (['http://localhost:3000', 'https://skid.rocks', undefined].indexOf(origin) !== -1)  callback(null, true) }
    }))
    .use(express.static(path.join(__dirname, 'build')))
    .use(express.json())
    .use(cookieParser())
    .use(rateLimit({
      windowMs: 60 * 1000,
      max: 40,
      message: "Too many requests"
    }))
    .use(session({
      secret: 'skid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24
      }
    }))
    .use('/api', api)
    .get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
    .listen(process.env.PORT || 5000, () => { console.log(`SERVER PORT: ${process.env.PORT || 5000}`) });

  const io = socketio(app, {
    cors: {
      origin: process.env.NODE_ENV  ? 'https://skid.rocks' : 'http://localhost:3000',
      methods: ["GET", "POST"]
    }
  });
  io.use((socket, next) => {
    const jwtToken = socket.handshake.auth.token || socket.handshake.query.token || socket.handshake.token;
    if (!jwtToken) return next(new Error('Not Authorised'));

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error('Not Authorised'));
        next();
    })
  });
  io.on('connection', (socket) => {
    socket.on('joinChannel', (id) => {
      socket.leaveAll();
      // socket.removeAllListeners();
      socket.join(id);
    });
    socket.on('sendMessage', (message) => {
      try {
        if (message.data) {
          socket.nsp.to(message.data.messageChannel).emit('loadMessage', message.data);
        }
      } catch (e) {
        console.log(e)
      }
    });
  });
})();