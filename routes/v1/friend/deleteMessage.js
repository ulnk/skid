const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const FriendChannelModel = require('../../../models/friends/FriendChannelModel.js');
const FriendMessageModel = require('../../../models/friends/FriendMessageModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { messageId } = req.body;
    if (!messageId) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const foundMessage = await FriendMessageModel.findOne({ _id:messageId });
    if (!foundMessage) return res.sendStatus(400);

    foundMessage.remove()

    res.json(true);
});

module.exports = router