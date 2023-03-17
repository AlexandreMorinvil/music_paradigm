const ProgressionModel = require('database/db').Progression;
const UserModel = require('database/db').User;

const { generateProgressionSessionsStatusForUserId } = require('modules/progressions/progression-sessions-status');
const { generateUserSummariesList } = require('modules/users/user-summary-generator');
const progressionsService = require('../progressions/progressions.service');

// Exports
module.exports = {
    createUser,
    createUserWithCurriculum,
    getAll,
    getById,
    getExistingUserGroupsList,
    deleteUser,
    updateUserProfile,
};

async function createUser(user) {
    try {
        const userCreated = await UserModel.create(user);
        return {
            user: userCreated,
        };
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username is already used`);
            default:
                throw err;
        }
    }
}

async function createUserWithCurriculum(user, curriculumId, assignedParameters) {
    try {
        const { user: userCreated }  = await createUser(user);
        const { progression, progressionSummary } =
            await progressionsService.assignCurriculum(userCreated._id, curriculumId, assignedParameters);
        return {
            user: userCreated,
            progression: progression,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return await generateUserSummariesList();
    } catch (err) {
        throw err;
    }
}

async function getById(userId) {
    try {
        const user = await UserModel.findById(userId);
        const lastProgression = await ProgressionModel.getLastProgressionOfUser(userId);
        const progressionSummary = await generateProgressionSessionsStatusForUserId(userId);
        return {
            user: user,
            progression: lastProgression,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        throw err;
    }
}

async function getExistingUserGroupsList() {
    try {
        const groupsList = await UserModel.getExistingUserGroupsList();
        return groupsList;
    } catch (err) {
        throw err;
    }
}

async function updateUserProfile(userId, userUpdated) {
    try {
        const user = await UserModel.findById(userId);
        return await user.updateDetails(userUpdated);
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username is already used`);
            default:
                throw err;
        }
    }
}

async function deleteUser(userId) {
    try {
        return await UserModel.delete(userId);
    } catch (err) {
        throw err;
    }
}