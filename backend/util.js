const crypto = require('crypto');
const UserModel = require('./models/UserModel.js')

getUsernameFromToken = (token) => {
    let foundUser;
    require('jsonwebtoken').verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return;
        foundUser = decoded;
    })
    return foundUser.data.username
}

module.exports = { getUsernameFromToken, generateRandomInviteCode }