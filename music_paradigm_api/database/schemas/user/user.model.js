const mongoose = require('mongoose');
schema = require('./user.schema');

const bcrypt = require('bcryptjs');

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

module.exports = model;