const { Schema, model } = require('mongoose');
const MessageSchema = new Schema({
    content: String,
    owner: String,
    ownerName: String,
    creation: { type: Number, default: Date.now() },
    server: String,
    category: String,
    channel: String,
    small: Boolean,
    image: String,
    colour: String
});

module.exports = model('message', MessageSchema);