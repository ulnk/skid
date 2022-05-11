const express = require('express');

const { hash } = require('../../../util/other.js');
const { sign } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const OtherModel = require('../../../models/other/OtherModel.js');

const router = express.Router();
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);
    const hashedPassword = hash(password);

    const userFromUsername = await UserModel.findOne({ username, password: hashedPassword });
    const userFromEmail = await UserModel.findOne({ email: username, password: hashedPassword });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(400);

    if (foundUser.disabled) return res.sendStatus(403);

    req.session.user = await sign(foundUser);
    res.json({ jwt: await sign(foundUser) });
});

module.exports = router