require('dotenv').config();
const express = require('express');
const mongooose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const { io } = require('./util/socket.js');

const PORT = process.env.PORT || 5001;
const RATE_LIMIT = 120;
const DOMAINS = ['http://localhost:3000', 'https://skid.rocks', 'https://skid.today', undefined, 'chrome-extension://gmmkjpcadciiokjpikmkkmapphbmdjok'];

const apiRouter = require('./routes/index.js');
;(async () => {
    await mongooose.connect(process.env.MONGODB);
    const app = express() 
        .use(cors({origin: (origin, callback) => { if (DOMAINS.indexOf(origin) !== -1)  callback(null, true) }}))
        .use(express.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use(cookieParser())
        .use(rateLimit({ windowMs: 5 * 1000, max: RATE_LIMIT, message: "lil skid try and ddos. smoking on you 🚬🚬🚬🚬. https://discord.gg/horion2" }))
        .use(session({ secret: 'skid', resave: false, saveUninitialized: false, cookie: { expires: 60 * 60 * 24 } }))
        .use('/api', apiRouter)
        .listen(PORT, () => console.log(`[LOADED EXPRESS] PORT ${PORT}`));
    
    io(app, () => {
        console.log(`[LOADED SOCKET]`);
    });
})();