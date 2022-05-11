const { Schema, model } = require('mongoose');

const FriendChannelSchema = new Schema({
    person1: String,
    person2: String,
    creation: { type: Date, default: Date.now() },
    messages: [String]
});

module.exports = model('friendchannel', FriendChannelSchema);