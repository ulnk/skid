const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { channelId } = req.query;
    if (!channelId) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(400);
    const userFromUsername = await UserModel.findOne({ username, password: password });
    const userFromEmail = await UserModel.findOne({ email: username, password: password });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(403);
    
    const foundChannel = await ChannelModel.findOne({ _id:channelId });
    if (!foundChannel) return res.sendStatus(400);

    res.json(foundChannel);
});

module.exports = router