const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = require('_helpers/role');
const stringHandler = require('_helpers/string-handler');
const bcrypt = require('bcryptjs');
const { SECRET_PASSWORD_PLACEHOLDER } = require('modules/users/user-password');

// Error messages
const noteMaxLengthMessage = "The note must have a maximum of 1000 characters";

const groupMaxLengthMessage = "The group must have a maximum of 100 characters";

const passwordMaxLengthMessage = "The password must have a maximum of 100 characters";

const usernameMinLengthMessage = "The username must have at least one character";
const usernameMaxLengthMessage = "The username must have a maximum of 100 characters";

// Schema
const schema = new Schema(
    {
        // Using the 'timestamp' option of Mongoose offered inconsistent results, hence th manual addition.
        createdAt: {
            type: Date,
            default: null,
        },

        group: {
            type: String,
            default: '',
            sparse: true,
            trim: true,
            maxlength: [100, groupMaxLengthMessage],
        },

        isPasswordSecret: {
            type: Boolean,
            default: true,
        },


        lastLogin: {
            type: Date,
            default: null
        },

        note: {
            type: String,
            default: "",
            maxlength: [1000, noteMaxLengthMessage],
        },

        password: {
            type: String,
            default: '',
            required: isPasswordRequired,
            maxlength: [100, passwordMaxLengthMessage],
            set: setterPassword,
        },

        role: {
            type: String,
            default: roles.user,
            enum: Object.values(roles),
            set: setterRole
        },

        tags: {
            type: [String],
            default: [],
            set: setterTags
        },

        // Using the 'timestamp' option of Mongoose offered inconsistent results, hence th manual addition.
        updatedAt: {
            type: Date,
            default: null,
        },

        username: {
            type: String,
            default: defaultUsername,
            trim: true,
            unique: true,
            minlength: [1, usernameMinLengthMessage],
            maxlength: [100, usernameMaxLengthMessage],
            set: setterUsername
        },
    },
    {
        strict: true,
        runValidators: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                return ret;
            }
        }
    }
);

// Ensure that the virtual properties are also integrated in the schema
schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

schema.virtual('passwordHash').get(function () {
    return this.isPasswordSecret ? this.password : bcrypt.hashSync(this.password, 10);
});

schema.virtual('exposablePassword').get(function () {
    return this.isPasswordSecret ? SECRET_PASSWORD_PLACEHOLDER : this.password;
});

// Default functions
function defaultUsername() {
    return this.id;
}

// Required functions
function isPasswordRequired() {
    return typeof this.password === 'string' ? false : true
}

// Setter functions
function setterPassword(password = '') {
    // If the password is secret, we only store the hash
    if (this.isPasswordSecret) return bcrypt.hashSync(password, 10);
    else return password;
}

function setterRole(role) {
    if (!Object.values(roles).includes(role)) return roles.user;
    else return role;
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

module.exports = schema;