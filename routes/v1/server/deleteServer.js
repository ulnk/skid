const express = require('express');

const { globalServer } = require('../../../util/config.json');
const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');
const ChannelModel = require('../../../models/servers/ChannelModel.js');
const InviteModel = require('../../../models/servers/InviteModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { serverId } = req.body;
    if (!serverId || serverId === globalServer) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    if (serverId === "626f1c01498e8b7a3397f766") return res.sendStatus(403);

    const foundServer = await ServerModel.findOne({ _id:serverId });
    if (!foundServer) return res.sendStatus(400);
    
    if (foundServer.owner !== foundUser.id) return res.sendStatus(400);
    if (!foundUser.servers.includes(foundServer.id)) return res.sendStatus(400);
    if (!foundServer.members.includes(foundUser.id)) return res.sendStatus(400);

    const allUsers = await UserModel.find({});
    for (let user of allUsers) {
        user.servers = foundUser.servers.filter(filterServerId => filterServerId !== serverId);
        user.save(err => {});
    }

    await ServerModel.findOneAndDelete({ _id:serverId });
    await CategoryModel.findOneAndDelete({ server: serverId });
    await ChannelModel.findOneAndDelete({ server: serverId });
    await InviteModel.findOneAndDelete({ server: serverId });

    res.json(foundUser.servers.filter(filterServerId => filterServerId !== serverId));
});

module.exports = router