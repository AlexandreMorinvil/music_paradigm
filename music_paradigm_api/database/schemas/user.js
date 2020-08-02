const mongoose = require('mongoose');
const roles = require('_helpers/role');

// Required schemas
const curriculum = require('./curriculum').schemaCurriculum;
const progression = require('./curriculum').schemaProgression;

const Schema = mongoose.Schema;

const schema = new Schema({
    createdDate: { type: Date, default: Date.now },

    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: roles.user, enum: ['user', 'admin'] },

    firstName: { type: String, default: "FirstName" },
    lastName: { type: String, default: "LastName" },
    email: { type: String, unique: true },

    tasks: {
        curriculums: {
            type: [curriculum]
            // TODO: Add the default curriculum. default: {}
        },
        progression: {
            type: [progression],
            // TODO: Add the default curriculum. default: {}
        }
    }
});


// Ensure that the virtual properties are also integrated in the schema
schema.set('toJSON', { virtuals: true });

// Creating the model
const model = mongoose.model('User', schema, 'users');

module.exports = {
    schema: schema,
    model: model
}