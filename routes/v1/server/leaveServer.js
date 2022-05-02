const express = require('express');

const { globalServer } = require('../../../util/config.json');
const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { serverId } = req.body;
    if (!serverId || serverId === globalServer) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    if (serverId === "626f1c01498e8b7a3397f766") return res.sendStatus(403);

    const foundServer = await ServerModel.findOne({ _id: serverId });
    if (!foundServer) return res.sendStatus(400);

    if (foundServer.owner === foundUser.id) return res.sendStatus(400);
    if (!foundUser.servers.includes(foundServer.id)) return res.sendStatus(400);
    if (!foundServer.members.includes(foundUser.id)) return res.sendStatus(400);

    foundUser.servers = foundUser.servers.filter(filterServerId => filterServerId !== serverId);
    foundUser.save();

    foundServer.members = foundServer.members.filter(filterMember => filterMember !== foundUser.id);
    foundServer.save();

    res.json(foundUser.servers);
});

module.exports = router