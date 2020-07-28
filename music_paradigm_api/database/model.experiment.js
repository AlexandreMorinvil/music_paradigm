const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: {type: String},
    role: {type: String, default: roles.user},
    createdDate: { type: Date, default: Date.now },
    experimentFile: { type: String, default: 'exp1.json'},

    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: false,

    },
    email: {
        type: String,
        required: true,

    },
    passwordHash: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        required: true,
        default: roles.user

    },

    curriculums: [curriculum]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);