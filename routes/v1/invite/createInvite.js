const express = require('express');

const { randomString } = require('../../../util/other.js');
const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const InviteModel = require('../../../models/servers/InviteModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { serverId, inviteCode } = req.body;
    if (!serverId) return res.sendStatus(400);
    
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);
    
    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);
    
    const foundServer = await ServerModel.findOne({ _id:serverId });
    if (!foundServer) return res.sendStatus(400);
    
    const foundInvite = await InviteModel.findOne({ invite: inviteCode });
    if (foundInvite) return res.sendStatus(400);
    
    const newInvite = await InviteModel.create({ server: serverId, invite: inviteCode.replace(/\s/g, '-') || randomString() });
    if (!newInvite) return res.sendStatus(500);

    res.json(newInvite);
});

module.exports = router