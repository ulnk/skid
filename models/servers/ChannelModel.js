const { Schema, model } = require('mongoose');

const ChannelSchema = new Schema({
    name: String,
    server: String,
    category: String,
    creation: { type: Date, default: Date.now() },
    messages: [String]
});

module.exports = model('channel', ChannelSchema);