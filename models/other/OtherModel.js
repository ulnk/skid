const { Schema, model } = require('mongoose');

const OtherSchema = new Schema({}, { strict: false });

module.exports = model('other', OtherSchema);
exports.schema = OtherSchema;