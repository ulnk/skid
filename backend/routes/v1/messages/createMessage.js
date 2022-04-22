const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');
const MessageModel = require('../../../models/servers/ChannelModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { content, serverId, categoryId, channelId } = req.body;
    if (!serverId || !content || !categoryId, !channelId) return res.sendStatus(400);

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

    const allMessagesInChannel = await MessageModel.find({ server: serverId, category: categoryId, channel: channelId });
    const lastMessageInChannel = allMessagesInChannel[0];
    var messageIsSmall;

    if (lastMessageInChannel.owner === foundUser.id) 
        if (lastMessageInChannel.creation + (300000) > Date.now())
            messageIsSmall = true;

    const newMessage = await MessageModel.create({ content, owner: foundUser.id, server: serverId, category: categoryId, channel: channelId, small: messageIsSmall || false });
    if (!newMessage) return res.sendStatus(500);

    foundCategory.messages = [newMessage.id, ...foundCategory.messages];
    foundCategory.save();

    res.json(newInvite);
});

module.exports = router