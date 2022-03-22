const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    messageContent: String,
    messageOwner: String,
    messageUserId: String,
    messageCreation: {
        type: Date,
        default: Date.now()
    },
    messageChannel: String,
    isSmall: Boolean,
    profilePicture: String
});

const ChannelSchema = new Schema({
    channelName: String,
    allMessages: [MessageSchema]
});

const CategorySchema = new Schema({
    categoryName: String,
    allChannels: [ChannelSchema]
});

const ServerSchema = new Schema({
    serverName: String,
    serverOwner: String,
    allCategorys: [CategorySchema]
});

module.exports = model('EntireServer', ServerSchema);