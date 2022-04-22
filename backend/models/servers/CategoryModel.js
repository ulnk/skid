const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: String,
    server: String,
    creation: { type: Date, default: Date.now() },
    channels: [String]
});

module.exports = model('category', CategorySchema);