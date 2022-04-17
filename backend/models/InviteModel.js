const { Schema, model } = require('mongoose');
const InviteSchema = new Schema({
    inviteCode: String,
    serverId: String,
})

module.exports = model('Invite', InviteSchema)