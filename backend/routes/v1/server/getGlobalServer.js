const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const OtherModel = require('../../../models/other/OtherModel.js');

const router = express.Router();
router.get('/', jwt, async (req, res) => {
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const allThings = await OtherModel.find({});
    const globalServerId = allThings.filter((thing) => thing.global)[0];
    if (!globalServerId) return res.sendStatus(500);

    const foundServer = await ServerModel.findOne({ _id: globalServerId.global });
    if (!foundServer) return res.sendStatus(500);
    
    res.json(foundServer);
});

module.exports = router