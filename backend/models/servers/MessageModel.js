const { Schema, model } = require('mongoose');
const MessageSchema = new Schema({
    content: String,
    owner: String,
    creation: { type: Number, default: Date.now() },
    server: String,
    category: String,
    channel: String,
    small: Boolean,
    image: String
});

module.exports = model('message', MessageSchema);