const ProgressionModel = require('database/db').Progression;
const User = require('database/db').User;

const progressionSummaryService = require('modules/progressions/progressions-summary.service');
const { generateUserSummariesList } = require('modules/users/user-summary-generator');

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
        const userCreated = await User.create(user);
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

async function createUserWithCurriculum(user, assignedParameters) {
    try {
        const userCreated = await User.create(user);
        // TODO: Improve the handling of this function to not require a "curriculumId" as a separate parameter.
        const progressionInitilized = await userProgressionService.initializeProgression(userCreated, user.curriculum, assignedParameters);
        const progressionSummary = await progressionSummaryService.generateProgressionSummaryForUserId(userCreated._id);
        return {
            user: userCreated,
            progression: progressionInitilized,
            progressionSummary: progressionSummary,
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

async function getAll() {
    try {
        return await generateUserSummariesList();
    } catch (err) {
        throw err;
    }
}

async function getById(userId) {
    try {
        const user = await User.findById(userId);
        const lastProgression = await ProgressionModel.getLastProgressionOfUser(userId);
        const progressionSummary = await progressionSummaryService.generateProgressionSummaryForUserId(userId);
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
        const groupsList = await User.getExistingUserGroupsList();
        return groupsList;
    } catch (err) {
        throw err;
    }
}

async function updateUserProfile(userId, userUpdated) {
    try {
        const user = await User.findById(userId);
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
        return await User.delete(userId);
    } catch (err) {
        throw err;
    }
}