const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    userRole: {
        type: String,
        default: 'Basic User'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    profileUrl: {
        type: String,
        default: 'https://techyhost.com/wp-content/uploads/2021/12/discord-default-avatar.jpg?ezimgfmt=rs:350x343/rscb2/ng:webp/ngcb2'
    },
    currentJwt: String
})

module.exports = model('User', UserSchema)