const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');
const MessageModel = require('../../../models/servers/MessageModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { content, serverId, categoryId, channelId, small } = req.body;
    if (!serverId || !content || !categoryId, !channelId) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);
    
    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);
    
    const foundServer = await ServerModel.findOne({ _id:serverId });
    if (!foundServer) return res.sendStatus(400);
    
    const foundCategory = await CategoryModel.findOne({ _id:categoryId });
    if (!foundCategory) return res.sendStatus(400);
    
    const foundChannel = await ChannelModel.findOne({ _id:channelId });
    if (!foundChannel) return res.sendStatus(400);
    
    const creation = Date.now();

    const newMessage = await MessageModel.create({ content, owner: foundUser.id, ownerName: foundUser.username, server: serverId, category: categoryId, channel: channelId, small: small || false, image: foundUser.image, creation });
    if (!newMessage) return res.sendStatus(500);
    
    foundChannel.messages = [...foundChannel.messages, newMessage._id];
    foundChannel.save(err => {}); //some dome work around for try catch
    
    res.json(newMessage);
});

module.exports = router