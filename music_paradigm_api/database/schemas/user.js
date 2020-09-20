const mongoose = require('mongoose');
const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

const stringHandler = require('_helpers/stringHandler');

// Required schemas
const curriculum = require('./curriculum').schemaCurriculum;
const progression = require('./curriculum').schemaProgression;

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        username: {
            type: String,
            default: function () { return this.id; },
            unique: true,
            sparse: true,
            minlength: 1,
            maxlength: 100,
            trim: true,
            set: setterUsername
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            default: null,
            maxlength: 100,
            trim: true,
            validate: { 
                validator: validatorEmail,
                message: "The eail is invalid"
            },
            set: setterEmail
        },
        password: {
            type: String,
            default: "music",
            required: true,
            alias: 'passwordHash',
            minlength: 1,
            maxlength: 100,
            set: setterPassword,
        },
        role: {
            type: String,
            default: roles.user,
            enum: ['user', 'admin']
        },
        tags: {
            type: [String],
            default: [],
            set: setterTags
        },


        firstName: {
            type: String,
            default: "FirstName",
            maxlength: 50,
            trim: true,
            set: setterName
        },
        middleName: {
            type: String,
            default: "",
            maxlength: 50,
            trim: true,
            set: setterName
        },
        lastName: {
            type: String,
            default: "LastName",
            maxlength: 50,
            trim: true,
            set: setterName
        },

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

// Setters
function setterEmail(email) {
    return (email) ? email : undefined;
}

function setterName(name) {
    if (name) return stringHandler.capitalizeFirstLetters(name);
    else return undefined;
}

function setterPassword(password) {
    return bcrypt.hashSync(password, 10)
}

function setterTags(tags) {
    let tagsFormated = [];
    for (let i in tags)
        if (tags[i])
            tagsFormated.push(stringHandler.fixSpaces(tags[i].toLowerCase()));
    return [...new Set(tagsFormated)];
}

function setterUsername(username) {
    return (username) ? username : this.id;
}

// ValidatorEmail
function validatorEmail(string) {
    if (!string) return true;
    else return isEmailString(string);
}

// Static methods
schema.statics.getListAllHeaders = function () {
    return this.find({}, '-tasks').sort({ role: 1, username: 1 });
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
schema.methods.create = async function () {
    if (!this.email) this.email = undefined;
    if (!this.firstName) this.firstName = undefined;
    if (!this.lastName) this.lastName = undefined;
    return this.save();
}

schema.methods.updateIdentity = async function (updatedUser) {
    if (updatedUser.hasOwnProperty('username')) this.username = updatedUser.username;
    if (updatedUser.hasOwnProperty('email')) this.email = updatedUser.email;
    if (updatedUser.hasOwnProperty('password')) this.password = updatedUser.password;
    if (updatedUser.hasOwnProperty('tags')) this.tags = updatedUser.tags;
    if (updatedUser.hasOwnProperty('firstName')) this.firstName = updatedUser.firstName;
    if (updatedUser.hasOwnProperty('middleName')) this.middleName = updatedUser.middleName;
    if (updatedUser.hasOwnProperty('lastName')) this.lastName = updatedUser.lastName;

    return this.save();
};

// Creating the model
const model = mongoose.model('User', schema);

module.exports = {
    schema: schema,
    model: model
}