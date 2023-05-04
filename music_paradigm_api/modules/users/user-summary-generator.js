const ProgressionModel = require('database/db').Progression;
const UserModel = require('database/db').User;

const curriculumGetters = require('database/models/curriculum/curriculum.getters');
const progressionGetters = require('database/models/progression/progression.getters.js');
const UserSummary = require('modules/users/class/user-summary.class');
const roles = require('_helpers/role');
const {
    generateProgressionToCurriculumAssociationSummary
} = require('modules/progressions/progression-curriculum-association');


// Exports
module.exports = {
    generateUserSummariesList,
    generateUserSummary,
};

async function generateUserSummariesList() {
    const userSummariesList = [];
    const usersObjectList = await UserModel.find({ role: roles.user }).lean();
    await Promise.all(usersObjectList.map(async (usersObject) => {
        userSummariesList.push(await generateUserSummary(usersObject));
    }));
    return userSummariesList;
};

async function generateUserSummary(user) {

    const currentProgression = (await ProgressionModel.getActiveProgressionByUserId(user._id)) || null;
    const currentCurriculum = currentProgression ? await currentProgression.getCurriculum() : null;

    return new UserSummary({
        curriculumTitle: curriculumGetters.getTitle(currentCurriculum),
        assignedParameters: progressionGetters.getAssignedParameters(currentProgression),
        progressionStartDate: progressionGetters.getAdvanceStartDate(currentProgression),
        progressionStartTime: progressionGetters.getAdvanceStartTime(currentProgression),
        progressionLastAdvancedDate: progressionGetters.getLastAdvanceDate(currentProgression),
        progressionLastAdvancedTime: progressionGetters.getLastAdvanceTime(currentProgression),
        progressionDuration: progressionGetters.getDuration(currentProgression),
        ...generateProgressionToCurriculumAssociationSummary(currentCurriculum, currentProgression),
        ...user,
    })
}