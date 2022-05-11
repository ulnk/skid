const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(400);
    const userFromUsername = await UserModel.findOne({ username, password: password });
    const userFromEmail = await UserModel.findOne({ email: username, password: password });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(403);

    foundUser.remove();

    res.json({ success: true });
});

module.exports = router