const express = require('express');

const { hash } = require('../../../util/other.js');
const { sign } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const OtherModel = require('../../../models/other/OtherModel.js');

const router = express.Router();
router.post('/', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.sendStatus(400);

    const userFromUsername = await UserModel.findOne({ username });
    const userFromEmail = await UserModel.findOne({ email: username });
    const foundUser = userFromUsername || userFromEmail;
    if (!foundUser) return res.sendStatus(400);

    if (foundUser.disabled) return res.sendStatus(403); 
    if (foundUser.premium < 2) return res.sendStatus(403);

    req.user = await sign(foundUser);
    res.json({ jwt: await sign(foundUser) });
});

module.exports = router