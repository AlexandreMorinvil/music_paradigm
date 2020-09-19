const mongoose = require('mongoose');
const roles = require('../_helpers/role');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: roles.user, enum: ['user', 'admin'] },

    firstName: { type: String, default: "FirstName" },
    lastName: { type: String, default: "LastName" },
    email: { type: String, unique: true },

    createdDate: { type: Date, default: Date.now },

    curriculums: [curriculum],

    experimentFile: { type: String, default: 'exp1.json' },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);