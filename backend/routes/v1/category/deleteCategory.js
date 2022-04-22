const express = require('express');

const { jwt } = require('../../../util/jwt.js');

const UserModel = require('../../../models/user/UserModel.js');
const ServerModel = require('../../../models/servers/ServerModel.js');
const CategoryModel = require('../../../models/servers/CategoryModel.js');

const router = express.Router();
router.post('/', jwt, async (req, res) => {
    const { serverId, categoryId } = req.body;
    if (!serverId || !categoryId) return res.sendStatus(400);

    const { username, password } = req.user;
    if (!username || !password) return res.sendStatus(403);

    const foundUser = await UserModel.findOne({ username, password });
    if (!foundUser) return res.sendStatus(403);

    const foundServer = await ServerModel.findOne({ id: serverId });
    if (!foundServer) return res.sendStatus(400);

    const foundCategory = await CategoryModel.findOne({ id: categoryId });
    if (!foundCategory) return res.sendStatus(400);

    foundCategory.remove();
    foundServer.categories = foundServer.categories.filter(filterCategoryId => filterCategoryId !== categoryId)
    foundServer.save();

    res.json(foundServer);
});

module.exports = router