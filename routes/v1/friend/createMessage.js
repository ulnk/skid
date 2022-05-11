const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const FriendChannelModel = require('../../../models/friends/FriendChannelModel.js');
const FriendMessageModel = require('../../../models/friends/FriendMessageModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { content, friendId, small } = req.body;
    if (!content || !friendId) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(400);
    
    const userFromUsername = await UserModel.findOne({ username, password: password });
    const userFromEmail = await UserModel.findOne({ email: username, password: password });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(403);
    
    const foundFriend = await UserModel.findOne({ _id: friendId });
    if (!foundFriend) return res.sendStatus(400);

    const creation = Date.now();

    const newMessage = await FriendMessageModel.create({ content, owner: foundUser.id, ownerName: foundUser.username, friend: friendId, small: small || false, image: foundUser.image, creation });
    if (!newMessage) return res.sendStatus(500);
    
    res.json(newMessage);
});

module.exports = router