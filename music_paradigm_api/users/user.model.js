const mongoose = require('mongoose');
const roles = require('../_helpers/role');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    // password: { type: String },
    hash: {type: String},
    role: {type: String, default: roles.user},
    createdDate: { type: Date, default: Date.now },
    experimentFile: { type: String, default: 'exp1.json'},
    expLastMidi: { type: String, default: '0' },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);