const { Schema, model } = require('mongoose');

const ServerSchema = new Schema({
    name: String,
    owner: String,
    creation: { type: Date, default: Date.now() },
    categories: [String],
    members: [String],
    roles: [String]
});

module.exports = model('server', ServerSchema);