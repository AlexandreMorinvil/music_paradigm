const mongoose = require('mongoose');
schema = require('./user.middleware');

const curriculumGetters = require('curriculums/curriculums.getters');
const progressionGetters = require('progressions/progressions.getters');
const progressionAssociation = require('progressions/progressions-association.service');
const { SECRET_PASSWORD_PLACEHOLDER } = require('modules/users/user-password');


const roles = require('_helpers/role');
const bcrypt = require('bcryptjs');

schema.statics.authenticate = async function (username, password) {
    // Fetch user in the database
    const user = await this.findOne({ username });
    if (!user) throw new Error();

    // Validate password
    if (!bcrypt.compareSync(password, user.passwordHash)) throw new Error();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Return the user without the password hash
    return userWithoutPassword;
};

schema.statics.create = async function (user) {
    const { _id, id, ...userToCreate } = user;
    const userCreated = new model(userToCreate);
    return await userCreated.save();
};

schema.statics.delete = async function (userId) {
    const user = await model.findById(userId);
    return await user.remove();
};

schema.statics.isAdmin = async function (userId) {
    const user = await this.findById(userId);
    return user.role === roles.admin;
};

schema.statics.getExistingUserGroupsList = async function () {
    const groupsList = await this.distinct('group');
    return groupsList;
};

schema.statics.getLastProgression = async function (userId) {
    const user = await this.findOne({ _id: userId });
    if (user) return user.getLastProgression();
    else return null;
};

schema.statics.getCurriculumAndProgressionObject = async function (userId) {
    const curriculumAndProgression = await this
        .findById(userId, { curriculum: 1, progressions: { $slice: -1 } })
        .populate({ path: 'curriculum progressions' });
    const { curriculum, progressions } = curriculumAndProgression;
    return {
        curriculum: curriculum ? curriculum.toObject() : null,
        progression: progressions[0] ? progressions[0].toObject() : null,
    }
};


/**
 * @return {Array} 
 * [
 *     {
 *         username: String,
 *         role: String,
 *         tags: [String],
 *         
 *         curriculumTitle: String,
 *         
 *         progressionStartDate: Date,
 *         progressionStartTime: Number,
 *         progressionLastAdvancedDate: Date,
 *         progressionLastAdvancedTime: Number,
 *         
 *         wasProgressionTotalNumberAdjusted: Boolean,
 *         reachedExperimentTitle: String,
 *         progressionTotalNumber: Number,
 *         curriculumTotalNumber: Number,
 *         
 *         lastLogin: Date,
 *         createdAt: Date,
 *         updatedAt: Date,
 *     }
 * ]   
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
        userSummary.progressionDuration = progressionGetters.getDuration(currentProgression);
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

// Instance methods
schema.methods.updateProfile = async function (updatedUserDetails) {

    // We do not modify the progressions
    const { _id, id, progression, ...updatedUserDetailsToUpdate } = updatedUserDetails;

    // If the value is the "secret password" keyworad, we don't mofify the field
    if (updatedUserDetails.password === SECRET_PASSWORD_PLACEHOLDER) delete updatedUserDetails.password;

    // Perform the update
    Object.assign(this, updatedUserDetailsToUpdate);
    return this.save();
};

schema.methods.getLastProgression = async function () {
    const user = await model
        .findById(this._id, { progressions: { $slice: -1 } })
        .populate({ path: 'progressions' });
    const lastProgression = user.progressions[0];
    return lastProgression;
}

// Creating the model
const model = mongoose.model('User', schema);

module.exports = model;
