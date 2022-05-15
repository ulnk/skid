const express = require('express');

const { hash } = require('../../../util/other.js');
const { sign } = require('../../../util/jwt.js');
const UserModel = require('../../../models/user/UserModel.js');

const router = express.Router();
router.post('/', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) return res.sendStatus(400);
    const hashedPassword = hash(password);

    const userFromUsername = await UserModel.findOne({ username, password: hashedPassword });
    const userFromEmail = await UserModel.findOne({ email: username, password: hashedPassword });
    const foundUser = userFromUsername || userFromEmail;
    if (foundUser) return res.sendStatus(400);

    const newUser = await UserModel.create({ username, password: hashedPassword,email, joinedServers: [] });
    if (!newUser) return res.sendStatus(500);

    const signedUser = await sign(newUser);
    req.user = signedUser;
    res.json({ jwt: signedUser });
});

module.exports = router