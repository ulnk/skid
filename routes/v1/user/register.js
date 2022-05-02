const express = require('express');

const { hash } = require('../../../util/other.js');
const { sign } = require('../../../util/jwt.js');
const UserModel = require('../../../models/user/UserModel.js');

const router = express.Router();
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);
    const hashedPassword = hash(password);

    const foundUser = await UserModel.findOne({ username });
    if (foundUser) return res.sendStatus(400);

    const newUser = await UserModel.create({ username, password: hashedPassword, joinedServers: [] });
    if (!newUser) return res.sendStatus(500);

    const signedUser = await sign(newUser);
    req.session.user = signedUser;
    res.json({ jwt: signedUser });
});

module.exports = router