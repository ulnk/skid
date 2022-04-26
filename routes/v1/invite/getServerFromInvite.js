const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const InviteModel = require('../../../models/servers/InviteModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { inviteCode } = req.query;
    if (!inviteCode) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const foundInvite = await InviteModel.findOne({ invite: inviteCode });
    if (!foundInvite) return res.sendStatus(400);
    
    const foundServer = await ServerModel.findOne({ _id: foundInvite.server });
    console.log(foundServer)
    if (!foundServer) return res.sendStatus(400);

    res.json(foundServer);
});

module.exports = router