const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { serverId } = req.query;
    if (!serverId) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);
    
    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);
    
    const foundServer = await ServerModel.findOne({ _id:serverId });
    if (!foundServer) return res.sendStatus(400);
    
    const foundChannels = await ChannelModel.find({ server: serverId });
    if (!foundChannels) return res.sendStatus(400);
    
    res.json(foundChannels);
});

module.exports = router