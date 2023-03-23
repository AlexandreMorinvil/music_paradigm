const mongoose = require('mongoose');
schema = require('./user.middleware');

const { SECRET_PASSWORD_PLACEHOLDER } = require('modules/users/user-password');

const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

schema.statics.authenticate = async function (username, password) {
    // Get the user from the database
    const user = await this.findOne({ username });
    if (!user) throw new Error();

    // Validate password
    if (!bcrypt.compareSync(password, user.passwordHash)) throw new Error();

    // Return the user
    user.indicateLogin(user._id);
    return user.toObject();
};

schema.statics.create = async function (user) {
    const { _id, id, ...userToCreate } = user;
    userToCreate.createdAt = Date.now();
    const userCreated = new model(userToCreate);
    return userCreated.save();
};

schema.statics.delete = async function (userId) {
    const user = await model.findById(userId);
    return await user.remove();
};

schema.statics.deleteUserLastProgression = async function (userId) {
    const user = await this.findOne({ _id: userId });
    if (user) return user.deleteLastProgression();
    else return null;
}

schema.statics.getExistingUserGroupsList = async function () {
    const groupsList = await this.distinct('group');
    return groupsList;
};

schema.statics.getLastProgression = async function (userId) {
    const user = await this.findOne({ _id: userId });
    if (user) return user.getLastProgression();
    else return null;
};

schema.statics.indicateLoginToUserById = async function (userId) {
    return this.findOneAndUpdate({ _id: userId }, { lastLogin: Date.now() });
};

schema.statics.isAdmin = async function (userId) {
    const user = await this.findById(userId);
    return user.role === roles.admin;
};

// Instance methods
schema.methods.deleteLastProgression = async function () {
    const user = await this.findOne({ _id: userId });
    if (user) return user.deleteLastProgression();
    else return null;
}

schema.methods.indicateLogin = async function () {
    this.lastLogin = Date.now();
    return this.save();
};

schema.methods.updateDetails = async function (updatedUserDetails) {

    // We do not modify the progressions
    const { _id, id, progression, ...updatedUserDetailsToUpdate } = updatedUserDetails;

    // If the value is the "secret password" keyworad, we don't mofify the field
    if (updatedUserDetails.password === SECRET_PASSWORD_PLACEHOLDER) delete updatedUserDetails.password;

    // Perform the update
    Object.assign(this, updatedUserDetailsToUpdate);
    this.updatedAt = Date.now();
    return this.save();
};

// Creating the model
const model = mongoose.model('User', schema);

module.exports = model;
