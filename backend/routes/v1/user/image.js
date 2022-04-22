const express = require('express');

const { jwt, sign } = require('../../../util/jwt.js');
const UserModel = require('../../../models/user/UserModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { imageLink } = req.body;
    if (!imageLink) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password ) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    foundUser.image = imageLink;
    foundUser.save();

    req.session.user = await sign(foundUser);
    res.json({ jwt: await sign(foundUser) });
});

module.exports = router