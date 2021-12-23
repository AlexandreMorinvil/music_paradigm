const mongoose = require('mongoose');
schema = require('./user.middleware');

const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

const progressionAssociation = require('progressions/progression-association.service.js');
const progressionGetters = require('progressions/progression.getters.js');
const curriculumGetters = require('curriculums/curriculums.getters.js');

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

/**
 * @return {Array} [
 *                      {
 *                          username: String,
 *                          email: String,
 *                          role: String,
 *                          tags: [String],
 *                          firstName: String,
 *                          middleName: String,
 *                          lastName: String,
 * 
 *                          curriculumTitle: String,
 * 
 *                          progressionStartDate: Date,
 *                          progressionStartTime: Number,
 *                          progressionLastAdvancedDate: Date,
 *                          progressionLastAdvancedTime: Number,
 * 
 *                          reachedExperimentTitle: String,
 *                          progressionTotalNumber: Number,
 *                          curriculumTotalNumber: Number,
 * 
 *                          lastLogin: Date,
 *                          createdAt: Date,
 *                          updatedAt: Date,
 *                      }
 *                  ]   
*/
schema.statics.getListAllSummaries = async function () {
    const usersList = await this
        .find({ role: roles.user })
        .populate({ path: 'curriculum progressions' })
        .sort({ role: 1, username: 1 });

    const usersHeaderList = [];
    usersList.forEach(element => {
        // Prepare the user summary object
        const userSummary = element.toObject();

        // Extract the populated curriculum and last progression
        const currentProgression = element.progressions[element.progressions.length - 1];
        const currentCurriculum = element.curriculum;

        // Add information from the curriculum and the progression
        userSummary.curriculumTitle = curriculumGetters.getTitle(currentCurriculum);
        userSummary.progressionStartDate = progressionGetters.getAdvanceStartDate(currentProgression);
        userSummary.progressionStartTime = progressionGetters.getAdvanceStartTime(currentProgression);
        userSummary.progressionLastAdvancedDate = progressionGetters.getLastAdvanceDate(currentProgression);
        userSummary.progressionLastAdvancedTime = progressionGetters.getLastAdvanceTime(currentProgression);
        Object.assign(userSummary, progressionAssociation.generateProgressionToCurriculumAssociationSummary(currentCurriculum, currentProgression));

        // Remove undesirable attributes
        delete userSummary.progressions;
        delete userSummary.curriculum;
        delete userSummary.password;

        // Add the user to the list of summaries of users
        usersHeaderList.push(userSummary);
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
    if (user) return user.getLastProgression();
    else return null;
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
    // if (!curriculum) return null;
    this.curriculum = curriculum || {};

    // Initialize Progression
    const lastProgression = await this.getLastProgression();
    if (lastProgression) {
        if (!(lastProgression.wasStarted() && lastProgression.isForCurriculum(this.curriculum))) {
            await lastProgression.remove();
            await this.addNewProgression(curriculum, parameters);
        }
    }
    else await this.addNewProgression(curriculum, parameters);

    return this.getLastProgression();
}

schema.methods.assignParameters = async function (parameters) {
    const lastProgression = await this.getLastProgression();
    lastProgression.assignedParameters = parameters;
    return lastProgression.save();
}

schema.methods.resetProgression = async function () {
    const lastProgression = await this.getLastProgression();
    await this.addNewProgression(curriculumInformation);
    if (lastProgression && !lastProgression.wasStarted()) await lastProgression.remove();

    return this.getLastProgression();
}

schema.methods.getLastProgression = async function () {
    const user = await model
        .findById(this._id, { progressions: { $slice: -1 } })
        .populate({ path: 'progressions' });
    const progressions = user.progressions;
    const lastProgression = progressions[0];
    return lastProgression;
}

schema.methods.addNewProgression = async function (curriculum, parameters) {
    const Progression = require('database/models/progression/progression.model');
    const newProgression = new Progression({
        userReference: this._id,
        curriculumReference: curriculum,
        assignedParameters: { ...parameters },
    });
    await newProgression.save();
    this.progressions.push(newProgression);
    return this.save();
}

// Creating the model
const model = mongoose.model('User', schema);

module.exports = model;
