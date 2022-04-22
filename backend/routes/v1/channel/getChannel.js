const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { serverId, categoryId, channelId } = req.query;
    if (!serverId || !categoryId || !channelId) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const foundServer = await ServerModel.findOne({ id: serverId });
    if (!foundServer) return res.sendStatus(400);

    const foundCategory = await CategoryModel.findOne({ id: categoryId });
    if (!foundCategory) return res.sendStatus(400);
    
    const foundChannel = await ChannelModel.findOne({ id: channelId });
    if (!foundChannel) return res.sendStatus(400);

    foundChannel.remove();

    res.json(foundChannel);
});

module.exports = router