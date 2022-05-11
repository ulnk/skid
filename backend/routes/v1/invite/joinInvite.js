const express = require('express');

const { jwt } = require('../../../util/jwt.js');
const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const InviteModel = require('../../../models/servers/InviteModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { inviteCode } = req.body;
    if (!inviteCode) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const foundInvite = await InviteModel.findOne({ invite: inviteCode });
    if (!foundInvite) return res.sendStatus(400);

    const foundServer = await ServerModel.findById(foundInvite.server);
    if (!foundServer) return res.sendStatus(400);

    foundInvite.uses++;
    if (foundInvite.max >= foundInvite.uses && foundInvite.max === -1) foundServer.remove();
    
    if (foundUser.servers.includes(foundServer.id)) return res.sendStatus(400);
    if (foundServer.members.includes(foundUser.id)) return res.sendStatus(400);

    foundUser.servers.push(foundInvite.server);
    foundUser.save(err => {});

    foundServer.members.push(foundUser.id);
    foundServer.save(err => {});

    res.json(foundServer);
});

module.exports = router