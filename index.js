require('dotenv').config();
const express = require('express');
const mongooose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const path = require('path');
const { io } = require('./util/socket.js');

const PORT = process.env.PORT || 5001;
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT) || 220;
const DOMAINS = ['http://localhost:3000', 'https://app.skid.today', 'https://skid.today', undefined, 'chrome-extension://gmmkjpcadciiokjpikmkkmapphbmdjok'];

const apiRouter = require('./routes/index.js');
;(async () => {
    await mongooose.connect(process.env.MONGODB);
    const app = express() 
        .use(express.static(path.join(__dirname, 'build')))
        .use(cors({origin: (origin, callback) => { if (DOMAINS.indexOf(origin) !== -1)  callback(null, true) }}))
        .use(express.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use(cookieParser())
        .use(rateLimit({ windowMs: 5 * 1000, max: RATE_LIMIT, message: "lil skid try and ddos. smoking on you 🚬🚬🚬🚬. https://discord.gg/horion" }))
        .use('/api', apiRouter)
        .get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))
        .listen(PORT, () => console.log(`[LOADED EXPRESS] PORT ${PORT}`));
    
    io(app, () => {
        console.log(`[LOADED SOCKET]`);
    });
})();
