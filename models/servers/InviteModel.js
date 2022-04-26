const { Schema, model } = require('mongoose');

const InviteSchema = new Schema({
    invite: String,
    server: String,
    creation: { type: Date, default: Date.now() },
    expires: { type: Date, default: Date.now() + (6.048e+8) },
    max: { type: Number, default: -1 },
    uses: { type: Number, default: 0 },
});

module.exports = model('invite', InviteSchema);
exports.schema = InviteSchema;