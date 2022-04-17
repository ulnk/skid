const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    userRole: {
        type: Number,
        default: 1
        // 1 = no payment plan
        // 2 = basic payment plan
        // 3 = full payment plan
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    profileUrl: {
        type: String,
        default: 'https://cdn.skid.rocks/img/1f0bfc0865d324c2587920a7d80c609b.png'
    },
    currentJwt: String,
    joinedServers: {
        type: Array,
        default: ['624f27b0a7d5c2868ee26674']
    }
})

module.exports = model('User', UserSchema)