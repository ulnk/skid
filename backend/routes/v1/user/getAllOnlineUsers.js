const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { serverId } = req.query;
    if (!serverId) return res.sendStatus(403);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    let allUsers = await UserModel.find({});
    allUsers = allUsers.filter(user => user.servers.includes(serverId) && user.online);
    
    res.json(allUsers);
});

module.exports = router