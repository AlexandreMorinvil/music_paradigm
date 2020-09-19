const mongoose = require('mongoose');
const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

// Required schemas
const curriculum = require('./curriculum').schemaCurriculum;
const progression = require('./curriculum').schemaProgression;

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        // Management data
        username: { type: String, unique: true, sparse: true },
        email: { type: String, unique: true, sparse: true, default: null },
        password: {
            type: String,
            required: true,
            alias: 'passwordHash',
            set: (password) => bcrypt.hashSync(password, 10)
        },
        role: { type: String, default: roles.user, enum: ['user', 'admin'] },
        tags: { type: [String], default: [] },

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
        runValidators: true,
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

schema.statics.authenticate = async function (username, password) {
    // Fetch user in the database
    const user = await this.findOne({ username });
    if (!user) throw new Error;

    // Validate password
    if (!bcrypt.compareSync(password, user.passwordHash)) throw new Error;
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return userWithoutPassword;
};

// Instance methods
schema.methods.updateIdentity = async function (updatedUser) {
    const oldDescription = await this.toObject();

    Object.assign(this, updatedUser);
    return this;
};

// Creating the model
const model = mongoose.model('User', schema, 'users');

module.exports = {
    schema: schema,
    model: model
}