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
    generateUserSummaryFromId,
    generateUserSummary,
};

async function generateUserSummariesList() {
    const usersDocumentList = await UserModel.find({ role: roles.user });
    const userSummariesList = [];
    await Promise.all(usersDocumentList.map(async (userDocument) => {
        userSummariesList.push(await generateUserSummary(userDocument));
    }));
    return userSummariesList;
};

async function generateUserSummaryFromId(userId) {
    const userDocument = await UserModel.findOne({ _id: userId });
    return generateUserSummary(userDocument);
}

async function generateUserSummary(userDocument) {

    const currentProgression = (await ProgressionModel.getLastProgressionOfUser(userDocument._id)) || null;
    const currentCurriculum = currentProgression ? await currentProgression.getCurriculum() : null;

    return new UserSummary({
        curriculumTitle: curriculumGetters.getTitle(currentCurriculum),
        progressionStartDate: progressionGetters.getAdvanceStartDate(currentProgression),
        progressionStartTime: progressionGetters.getAdvanceStartTime(currentProgression),
        progressionLastAdvancedDate: progressionGetters.getLastAdvanceDate(currentProgression),
        progressionLastAdvancedTime: progressionGetters.getLastAdvanceTime(currentProgression),
        progressionDuration: progressionGetters.getDuration(currentProgression),
        ...generateProgressionToCurriculumAssociationSummary(currentCurriculum, currentProgression),
        ...userDocument.toObject(),
    })
}