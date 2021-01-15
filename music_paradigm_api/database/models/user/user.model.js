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

schema.statics.create = async function (userParameters) {
    const user = await new model(userParameters);
    return user.save();
};

schema.statics.delete = async function (userId) {
    const user = await this.findById(userId);
    user.progressions.pull();
    await removeAllProgressions(this._id);
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

schema.statics.getCurriculumAndProgressionData = async function (userId) {
    const curriculumAndProgression = await this.findById(userId, { curriculum: 1, progressions: { $slice: -1 } }).populate({ path: 'curriculum progressions' });
    const { curriculum, progressions } = curriculumAndProgression.toObject();
    return { curriculum: curriculum || null, progression: (progressions) ? progressions[0] : null }
};

schema.statics.getLastProgression = async function (userId) {
    return getLastProgression({ _id: userId }, this) || {};
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

schema.methods.initializeCurriculum = async function (curriculumInformation) {
    // Assign curriculum
    if (!curriculumInformation.curriculum) return;
    this.curriculum = curriculumInformation.curriculum;

    // Initialize Progression
    const lastProgression = await getLastProgression(this, model);
    if (lastProgression) {
        if (lastProgression.wasStarted() && lastProgression.isForCurriculum(this.curriculum)) { }
        else {
            await removeProgression(this, lastProgression);
            addNewProgression(this, curriculumInformation);
        }
    } else addNewProgression(this, curriculumInformation);

    return await this.save();
}

schema.methods.updateCurriculum = async function (parameters) {
    const lastProgression = await getLastProgression(this, model);
    if (parameters.hasOwnProperty('curriculumParameters')) lastProgression.curriculumParameters = parameters.curriculumParameters;

    return await this.save();
}

schema.methods.resetProgression = async function () {
    const lastProgression = await getLastProgression(this, model);
    addNewProgression(this, curriculumInformation);
    if (lastProgression && !lastProgression.wasStarted()) await removeProgression(this, lastProgression);

    return await this.save();
}

schema.methods.getCurriculumSummary = async function () {
    const lastProgression = await getLastProgression(this, model);
    if (!lastProgression) return null;
    else return {
        curriculum: lastProgression.curriculumReference,
        curriculumParameters: lastProgression.curriculumParameters,
    };
}

// Helper functions
async function getLastProgression(instance, model) {
    const user = await model.findById(instance._id, { progressions: { $slice: -1 } }).populate({ path: 'progressions' });
    const progressions = user.progressions;
    const lastProgression = progressions[0];
    return lastProgression;
}

function addNewProgression(instance, parameters) {
    const Progression = require('database/models/progression/progression.model');
    const newProgression = new Progression({
        userReference: instance._id,
        curriculumReference: instance.curriculum,
        curriculumParameters: parameters.curriculumParameters || null
    });
    instance.progressions.push(newProgression);
}

async function removeProgression(instance, progression) {
    instance.progressions.pull({ _id: progression._id });
    progression.remove();
}

async function removeAllProgressions(userId) {
    const Progression = require('database/models/progression/progression.model');
    Progression.remove({ userReference: userId });
}

// Creating the model
const model = mongoose.model('User', schema);

module.exports = model;
