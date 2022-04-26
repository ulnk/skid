const express = require('express');
const fs = require('fs');

const router = express.Router();
;(async() => {
    for (let file of fs.readdirSync(__dirname)) {
        if (fs.lstatSync(`${__dirname}/${file}`).isFile()) continue;
        router.use(`/${file}`, require(`${__dirname}/${file}/index.js`));
    }
})().catch();

module.exports = router