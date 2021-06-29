const mongoose = require('mongoose');
schema = require('./user.middleware');

const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

// Static methods
schema.statics.authenticate = async function (username, password) {
    // Fetch user in the database
    const user = await this.findOne({ username });
    if (!user) throw new Error();

    // Validate password
    if (!bcrypt.compareSync(password, user.passwordHash)) throw new Error();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return userWithoutPassword;
};

schema.statics.create = async function (userParameters) {
    const user = await new model(userParameters);
    return user.save();
};

schema.statics.delete = async function (userId) {
    const user = await model.findById(userId);
    return await user.remove();
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

schema.statics.isAdmin = async function (userId) {
    const user = await this.findById(userId);
    return user.role === roles.admin;
};

schema.statics.getCurriculumAndProgressionData = async function (userId) {
    const curriculumAndProgression = await this
        .findById(userId, { curriculum: 1, progressions: { $slice: -1 } })
        .populate({ path: 'curriculum progressions' });
    const { curriculum, progressions } = curriculumAndProgression;

    const userCurriculum = curriculum ? curriculum.toObject() : null;
    const userProgression = progressions[0] ? progressions[0].toObject() : null;
    
    return {
        curriculum: userCurriculum,
        progression: userProgression,
    }
};

schema.statics.getLastProgression = async function (userId) {
    const user = await this.findOne({ _id: userId });
    return user.getLastProgression();
};

// Instance methods
schema.methods.updateUser = async function (updatedUser) {
    if (updatedUser.hasOwnProperty('username')) this.username = updatedUser.username;
    if (updatedUser.hasOwnProperty('email')) this.email = updatedUser.email;
    if (updatedUser.hasOwnProperty('password')) this.password = updatedUser.password;
    if (updatedUser.hasOwnProperty('tags')) this.tags = updatedUser.tags;
    if (updatedUser.hasOwnProperty('firstName')) this.firstName = updatedUser.firstName;
    if (updatedUser.hasOwnProperty('middleName')) this.middleName = updatedUser.middleName;
    if (updatedUser.hasOwnProperty('lastName')) this.lastName = updatedUser.lastName;

    return this.save();
};

schema.methods.initializeCurriculum = async function (curriculum, parameters) {
    // Assign curriculum
    if (!curriculum) return null;
    this.curriculum = curriculum;

    // Initialize Progression
    const lastProgression = await getLastProgression(this, model);
    if (lastProgression) {
        if (!(lastProgression.wasStarted() && lastProgression.isForCurriculum(this.curriculum))) {
            await lastProgression.remove();
            addNewProgression(this, curriculum, parameters);
        }
    }
    else addNewProgression(this, curriculum, parameters);

    await this.save();
    return this.getLastProgression();
}

schema.methods.assignParameters = async function (parameters) {
    const lastProgression = await this.getLastProgression();
    lastProgression.assignedParameters = parameters;
    return await lastProgression.save();
}

// TODO : To fix
schema.methods.resetProgression = async function () {
    const lastProgression = await getLastProgression(this, model);
    addNewProgression(this, curriculumInformation);
    if (lastProgression && !lastProgression.wasStarted()) await lastProgression.remove();

    await this.save();
    return this.getLastProgression(this, model);
}

schema.methods.getLastProgression = async function() {
    const user = await model
        .findById(this._id, { progressions: { $slice: -1 } })
        .populate({ path: 'progressions' });
    const progressions = user.progressions;
    const lastProgression = progressions[0];
    return lastProgression;
}

// Helper functions
function addNewProgression(instance, curriculum, parameters) {
    const Progression = require('database/models/progression/progression.model');
    const newProgression = new Progression({
        userReference: instance._id,
        curriculumReference: curriculum,
        assignedParameters: parameters,
    });
    newProgression.save();
    instance.progressions.push(newProgression);
}

// Creating the model
const model = mongoose.model('User', schema);

module.exports = model;
