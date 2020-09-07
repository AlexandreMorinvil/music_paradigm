const mongoose = require('mongoose');
const roles = require('_helpers/role');

// Required schemas
const curriculum = require('./curriculum').schemaCurriculum;
const progression = require('./curriculum').schemaProgression;

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        // Management data
        username: { type: String, unique: true, sparse: true },
        email: { type: String, unique: true, sparse: true },
        passwordHash: { type: String, required: true },
        role: { type: String, default: roles.user, enum: ['user', 'admin'] },
        groups: { type: [String], default: [] },

        // Description of the user
        firstName: { type: String, default: "FirstName" },
        middleName: { type: String, default: "MiddleName" },
        lastName: { type: String, default: "LastName" },

        //
        tasks: {
            curriculums: {
                type: [curriculum],
                default: []
            },
            progression: {
                type: [progression],
                default: []
            }
        },

        // Creation time of the user
        lastLogin: { type: Date, default: null },
    },
    {
        strict: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

// Ensure that the virtual properties are also integrated in the schema
schema.set('toJSON', { virtuals: true });

// Static methods
schema.statics.getListAllHeaders = function () {
    return this.find({}, '-tasks')
        .sort({ role: 1, username: 1 });
};

// Creating the model
const model = mongoose.model('User', schema, 'users');

module.exports = {
    schema: schema,
    model: model
}