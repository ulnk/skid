const express = require('express');
const fs = require('fs');

const router = express.Router();
;(async() => {
    for (let file of fs.readdirSync(__dirname)) {
        if (fs.lstatSync(`${__dirname}\\${file}`).isFile()) continue;
        for (let anotherFile of fs.readdirSync(`${__dirname}\\${file}`)) {
            if (fs.lstatSync(`${__dirname}\\${file}\\${anotherFile}`).isDirectory()) continue;
            router.use(`/${file}/${anotherFile.split('.')[0]}`, require(`${__dirname}\\${file}\\${anotherFile}`));
            // console.log('[*]', `/${file}/${anotherFile.split('.')[0]}`)
        }
    }
})().catch();

module.exports = router