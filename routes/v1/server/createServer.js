const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { serverName } = req.body;
    if (!serverName) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);
    
    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);
    
    const newChannel = await ChannelModel.create({ name: 'general' });
    if (!newChannel) return res.sendStatus(500);
    
    const newCategory = await CategoryModel.create({ name: 'Text Channels', channels: [newChannel.id] });
    if (!newCategory) return res.sendStatus(500);
    
    const newServer = await ServerModel.create({ name: serverName, owner: foundUser.id, categories:[newCategory.id] });
    if (!newServer) return res.sendStatus(500);
    
    newChannel.category = newCategory.id;
    newChannel.server = newServer.id;
    newChannel.save();
    
    newCategory.server = newServer.id;
    newCategory.save();
    
    foundUser.servers.push(newServer.id);
    foundUser.save();
    
    newServer.members.push(foundUser.id);
    newServer.save();
    
    res.json(newServer);
});

module.exports = router