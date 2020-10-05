const mongoose = require('mongoose');
schema = require('./user.schema');

const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

// Static methods
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

schema.statics.getListAllHeaders = async function () {
    const usersList = await this.find({ role: roles.user }).populate({ path: 'curriculum', select: 'title' }).sort({ role: 1, username: 1 });
    const usersHeaderList = [];

    usersList.forEach(element => {
        const userHeader = element.toObject();
        
        // Adding the name of the current curriculum
        if (userHeader.curriculum) userHeader.curriculumTitle = userHeader.curriculum.title;
        else userHeader.curriculumTitle = "";
        delete userHeader.curriculum;

        usersHeaderList.push(userHeader);
    });

    return usersHeaderList;
};

schema.statics.getProgressionData = async function (userId) {
    const curriculumProgression = await this.findById(userId, 'curriculum progressions').populate({ path: 'curriculum progressions' });
    return curriculumProgression.toObject();
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
    if (updatedUser.hasOwnProperty('curriculum')) this.curriculum = updatedUser.curriculum || undefined;

    return this.save();
};

// Creating the model
const model = mongoose.model('User', schema);

module.exports = model;