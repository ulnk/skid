const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(400);
    
    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    res.json({ auth: true });
});

module.exports = router