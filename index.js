require('dotenv').config();
const express = require('express');
const mongooose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const path = require('path');
const api = require('./routes/api.js');
const io = require('./socket.js')

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
      process.env.NODE_ENV && res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
    .listen(process.env.PORT || 5000, () => { console.log(`SERVER PORT: ${process.env.PORT || 5000}`) });

    io.start(app)
})();