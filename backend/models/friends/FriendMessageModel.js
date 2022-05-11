const { Schema, model } = require('mongoose');
const FriendMessageSchema = new Schema({
    content: String,
    owner: String,
    ownerName: String,
    creation: { type: Number, default: Date.now() },
    friend: String,
    small: Boolean,
    image: String
});

module.exports = model('friendmessage', FriendMessageSchema);