const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { serverId } = req.query;
    if (!serverId) return res.sendStatus(403);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const allUsers = await UserModel.find({});
    const online = serverId === "626f1c01498e8b7a3397f766" ? allUsers.filter(user => user.online) : allUsers.filter(user => user.servers.includes(serverId) && user.online);
    const offline = serverId === "626f1c01498e8b7a3397f766" ? allUsers.filter(user => user.online === false) : allUsers.filter(user => user.servers.includes(serverId) && user.online === false);
    
    res.json({ online, offline });
});

module.exports = router