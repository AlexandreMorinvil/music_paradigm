const mongoose = require('mongoose');
const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

const stringHandler = require('_helpers/stringHandler');

// Required schemas
// const curriculum = require('../curriculum/curriculum.schema').schemaCurriculum;
// const progression = require('../curriculum/curriculum.schema').schemaProgression;

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        username: {
            type: String,
            default: defaultUsername,
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
                message: "The email is invalid"
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
            curriculum: {
                type: Schema.Types.ObjectId,
                ref: 'Curriculum',
                default: null
            },
            progressions: {
                type: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Progression',
                    }
                ],
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

// Default functions
function defaultUsername() {
    return this.id;
}

// Setters functions
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

// Validator functions
function validatorEmail(string) {
    if (!string) return true;
    else return isEmailString(string);
}

module.exports = schema;