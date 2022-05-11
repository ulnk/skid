const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const FriendChannelModel = require('../../../models/friends/FriendChannelModel.js');
const FriendMessageModel = require('../../../models/friends/FriendMessageModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { friendId } = req.query;
    if (!friendId) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(400);

    const userFromUsername = await UserModel.findOne({ username, password: password });
    const userFromEmail = await UserModel.findOne({ email: username, password: password });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(403);
    
    let foundMessages = [];
    // merge both arrays
    foundMessages = [...foundMessages, ...(await FriendMessageModel.find({ owner: foundUser._id, friend: friendId }))];
    foundMessages = [...foundMessages, ...(await FriendMessageModel.find({ owner: friendId, friend: foundUser._id }))];
    
    foundMessages = foundMessages.sort((a, b) => a.creation-b.creation).reverse(); // sort array
    
    if (!foundMessages) return res.sendStatus(400);
    
    res.json(foundMessages);
});

module.exports = router