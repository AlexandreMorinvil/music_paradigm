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
    const user = await this.findById(userId, { progressions: { $slice: -1 } }).populate({ path: 'progressions' });
    return user.progressions[0];
};

// Instance methods
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

schema.methods.initializeCurriculum = async function (curriculumInformation) {
    const Progression = require('database/models/progression/progression.model');

    // Assign curriculum
    if (!curriculumInformation.curriculum) return;
    this.curriculum = curriculumInformation.curriculum;

    // Get last progression
    const user = await model.findById(this._id, { progressions: { $slice: -1 } }).populate({ path: 'progressions' });
    const progressions = user.progressions;
    const lastProgression = progressions[0];

    // Initialize progression
    const newProgression = new Progression({
        userReference: this._id,
        curriculumReference: this.curriculum,
        curriculumParameters: curriculumInformation.curriculumParameters
    });

    // If a progression was initialized
    if (lastProgression) {
        // If the last progression was not started, we descard it
        if (!lastProgression.wasStarted()) {
            this.progressions.pull({ _id: lastProgression._id });
            lastProgression.remove();
        }
        // If the last progression does not correspond to the assigned curriculum, we add a progression
        else if (!lastProgression.isForCurriculum(this.curriculum))
            this.progressions.push(newProgression)
    }
    // Else if no progression was initialized, we add a progression
    else this.progressions.push(newProgression);

    return await this.save();
}

schema.methods.updateCurriculum = async function (parameters) {
    // Get last progression
    const user = await model.findById(this._id, { progressions: { $slice: -1 } }).populate({ path: 'progressions' });
    const progressions = user.progressions;
    const lastProgression = progressions[0];

    // Update parameters 
    if (parameters.hasOwnProperty('curriculumParameters')) lastProgression.curriculumParameters = parameters.curriculumParameters;

    return await this.save();
}

schema.methods.resetProgression = async function () {
    const Progression = require('database/models/progression/progression.model');

    // Get last progression
    const user = await model.findById(this._id, { progressions: { $slice: -1 } }).populate({ path: 'progressions' });
    const progressions = user.progressions;
    const lastProgression = progressions[0];

    // Initialize progression
    const newProgression = new Progression({
        userReference: this._id,
        curriculumReference: this.curriculum,
        curriculumParameters: parameters.curriculumParameters // TODO: Put back the same parameters
    });

    // If a progression was initialized and the last progression was not started, we descard it
    if (lastProgression && !lastProgression.wasStarted()) {
        this.progressions.pull({ _id: lastProgression });
        lastProgression.remove();
    }

    // We add a new progression
    this.progressions.push(newProgression);

    return await this.save();
}

// Creating the model
const model = mongoose.model('User', schema);

module.exports = model;