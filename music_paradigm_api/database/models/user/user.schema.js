const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const roles = require('_helpers/role');
const stringHandler = require('_helpers/stringHandler');

// Error messages
const usernameMinLengthMessage = "The username must have at least one character";
const usernameMaxLengthMessage = "The username must have a maximum of 100 characters";

const emailMaxLengthMessage = "The email must have a maximum of 100 characters";
const emailValidatorMessage = "The email entered is not a valid email adress with the structure 'address@domain.ext'";

const passwordRequiredMessage = "The password is required"
const passwordMinLengthMessage = "The password must have a minimum of one character";
const passwordMaxLengthMessage = "The password must have a maximum of 100 characters";

const firstNameMaxLengthMessage = "The first name must have a maximum of 50 characters";
const middleNameMaxLengthMessage = "The middle name must have a maximum of 50 characters";
const lastNameMaxLengthMessage = "The last names must have a maximum of 50 characters";

// Schema
const schema = new Schema(
    {
        username: {
            type: String,
            default: defaultUsername,
            sparse: true,
            trim: true,
            unique: true,
            minlength: [1, usernameMinLengthMessage],
            maxlength: [100, usernameMaxLengthMessage],
            set: setterUsername
        },
        
        email: {
            type: String,
            default: null,
            sparse: true,
            trim: true,
            unique: true,
            maxlength: [100, emailMaxLengthMessage],
            validate: {
                validator: validatorEmail,
                message: emailValidatorMessage
            },
            set: setterEmail
        },

        password: {
            type: String,
            default: "music",
            alias: 'passwordHash',
            required: [true, passwordRequiredMessage],
            minlength: [1, passwordMinLengthMessage],
            maxlength: [100, passwordMaxLengthMessage],
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
            default: "Firstname",
            trim: true,
            maxlength: [50, firstNameMaxLengthMessage],
            set: setterName
        },

        middleName: {
            type: String,
            default: "",
            trim: true,
            maxlength: [50, middleNameMaxLengthMessage],
            set: setterName
        },

        lastName: {
            type: String,
            default: "Lastname",
            trim: true,
            maxlength: [50, lastNameMaxLengthMessage],
            set: setterName
        },

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
        },

        lastLogin: { 
            type: Date, 
            default: null
        },
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