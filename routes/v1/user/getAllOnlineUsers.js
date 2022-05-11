const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const OtherModel = require('../../../models/other/OtherModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { serverId } = req.query;
    if (!serverId) return res.sendStatus(403);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const allThings = await OtherModel.find({});
    const globalServerId = allThings.filter((thing) => thing.global)[0];

    const allUsers = await UserModel.find({});
    const online = serverId === globalServerId.global ? 
        allUsers.filter(user => user.online) : 
        allUsers.filter(user => user.servers.includes(serverId) && user.online && user._id !== foundUser._id);

    const offline = serverId === globalServerId.global ? 
        allUsers.filter(user => user.online === false) : 
        allUsers.filter(user => user.servers.includes(serverId) && user.online === false && user._id !== foundUser._id);
    
    res.json({ online, offline });
});

module.exports = router