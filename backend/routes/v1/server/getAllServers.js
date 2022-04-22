const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);
    
    const allServers = [];
    for (const id of foundUser.servers) {
        const foundServer = await ServerModel.findOne({ id });
        if (!foundServer) continue;
        allServers.push(foundServer);
    }
    
    res.json(allServers);
});

module.exports = router