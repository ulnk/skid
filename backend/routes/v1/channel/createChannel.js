const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { serverId, categoryId, channelName } = req.body;
    if (!serverId || !categoryId || !channelName) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const foundServer = await ServerModel.findOne({ _id:serverId });
    if (!foundServer) return res.sendStatus(400);

    const foundCategory = await CategoryModel.findOne({ _id:categoryId });
    if (!foundCategory) return res.sendStatus(400);
    
    const newChannel = await ChannelModel.create({ name: channelName, server: serverId, category: categoryId });
    if (!newChannel) return res.sendStatus(500);

    res.json(newChannel);
});

module.exports = router