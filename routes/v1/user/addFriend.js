const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const FriendChannelModel = require('../../../models/friends/FriendChannelModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { friendName } = req.body;
    if (!friendName) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(400);
    const userFromUsername = await UserModel.findOne({ username, password: password });
    const userFromEmail = await UserModel.findOne({ email: username, password: password });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(403);

    const foundFriend = await UserModel.findOne({ username: friendName });
    if (!foundFriend) return res.sendStatus(400);

    const foundFriendInFriends = await foundUser.friends.filter(filterFriend => foundFriend._id.toString() == filterFriend)
    if (foundFriendInFriends[0]) return res.sendStatus(400);

    foundFriend.friends = [foundUser._id, ...foundUser.friends]
    foundFriend.save(err => {});

    foundUser.friends = [foundFriend._id, ...foundUser.friends,];
    foundUser.save(err => {});

    const newFriendChannel = FriendChannelModel.create({ person1: foundUser._id, person2: foundFriend._id });

    const foundFriends = [];
    for (const friend of foundUser.friends) {   
        const foundFriend = await UserModel.findOne({ _id: friend });
        if (!foundFriend) return send.sendStatus(400);
        foundFriends.push(foundFriend)
    }

    res.json(foundFriends);
});

module.exports = router