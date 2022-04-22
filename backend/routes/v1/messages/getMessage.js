const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const MessageModel = require('../../../models/servers/ChannelModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { messageId } = req.query;
    if (!messageId) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const foundMessage = await MessageModel.findOne({ id: messageId });
    if (!foundMessage) return res.sendStatus(400);

    res.json(foundMessage);
});

module.exports = router