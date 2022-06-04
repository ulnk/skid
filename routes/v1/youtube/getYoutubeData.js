const express = require('express');

const { jwt } = require('../../../util/jwt.js');
const { getYoutubeData } = require('../../../util/youtube.js');



const router = express.Router();
router.post('/', async (req, res) => {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);

    res.json({ ...await getYoutubeData(id) });
});

module.exports = router