const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const MessageModel = require('../../../models/servers/MessageModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { serverId, channelId } = req.query;
    if (!serverId, !channelId) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(400);
    const userFromUsername = await UserModel.findOne({ username, password: password });
    const userFromEmail = await UserModel.findOne({ email: username, password: password });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(403);
    
    const foundMessages = await MessageModel.find({ server: serverId, channel: channelId });
    if (!foundMessages) return res.sendStatus(400);
    
    res.json(foundMessages.reverse());
});

module.exports = router