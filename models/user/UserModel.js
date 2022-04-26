const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    online: { type: Boolean, default: false },
    premium: { type: Number, default: 1 },
    creation: { type: Date, default: Date.now() },
    image: { type: String, default: 'https://cdn.skid.rocks/img/1f0bfc0865d324c2587920a7d80c609b.png' },
    servers: { type: Array, default: ['624f27b0a7d5c2868ee26674'] }
})

module.exports = model('user', UserSchema)
exports.schema = UserSchema;