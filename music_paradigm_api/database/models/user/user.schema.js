const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = require('_helpers/role');
const stringHandler = require('_helpers/string-handler');
const bcrypt = require('bcryptjs');
const { SECRET_PASSWORD_PLACEHOLDER } = require('modules/users/user-password');
const { NO_PASSWORD_PLACEHOLDER } = require('modules/users/user-password');

// Error messages
const usernameMinLengthMessage = "The username must have at least one character";
const usernameMaxLengthMessage = "The username must have a maximum of 100 characters";

const passwordRequiredMessage = "The password is required"
const passwordMinLengthMessage = "The password must have a minimum of one character";
const passwordMaxLengthMessage = "The password must have a maximum of 100 characters";

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

        password: {
            type: String,
            default: "music",
            required: [true, passwordRequiredMessage],
            minlength: [1, passwordMinLengthMessage],
            maxlength: [100, passwordMaxLengthMessage],
            set: setterPassword,
        },

        isPasswordSecret: {
            type: Boolean,
            default: true,            
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
schema.set('toJSON', { virtuals: false });

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

// Setter functions
function setterPassword(password) {

    // If the password is secret, we only store the hash
    const hashPasswordIfSecret = (password = "") => {
        if (this.isPasswordSecret) return bcrypt.hashSync(password, 10);
        else return password;
    }

    // If the value is the "secret password" keyworad, we don't mofify the field
    if (password === SECRET_PASSWORD_PLACEHOLDER) return;

    // If the value is is the "no password" keyword, we set the password to an empty string
    else if (password === NO_PASSWORD_PLACEHOLDER) hashPasswordIfSecret("");

    // Otherwise, we set the password to the required value
    else return hashPasswordIfSecret(password);
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