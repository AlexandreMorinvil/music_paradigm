const User = require('database/db').User;
const progressionSummaryService = require('progressions/progressions-summary.service');
const userProgressionService = require('users/user-progression.service');

// Exports
module.exports = {
    getAll,
    getById,
    getExistingUserGroupsList,
    createUser,
    updateUserProfile,
    deleteUser,
    assignCurriculum,
    assignParameters,
    assignAdjustments,
    resetProgression,
};

async function getAll() {
    try {
        return await User.getListAllSummaries();
    } catch (err) {
        throw err;
    }
}

async function getById(userId) {
    try {
        const user = await User.findById(userId).select('-password');
        const lastProgression = await user.getLastProgression();
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

async function createUser(user, curriculumId, assignedParameters) {
    try {
        const userCreated = await User.create(user);
        const progressionInitilized = await userProgressionService.initializeProgression(userCreated, curriculumId, assignedParameters);
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

async function updateUserProfile(userId, userUpdate) {
    try {
        const user = await User.findById(userId);
        return await user.updateProfile(userUpdate);
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

async function assignCurriculum(userId, curriculumId, assignedParameters) {
    try {
        const user = await User.findById(userId);
        const lastProgression = await userProgressionService.initializeProgression(user, curriculumId, assignedParameters);
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

async function assignParameters(userId, assignedParameters) {
    try {
        const lastProgression = await userProgressionService.updateParameters(userId, assignedParameters);
        const progressionSummary = await progressionSummaryService.generateProgressionSummaryForUserId(userId);
        return {
            progression: lastProgression,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        throw err;
    }
}

async function assignAdjustments(userId, assignedAdjustments) {
    try {
        const lastProgression = await userProgressionService.updateAdjustments(userId, assignedAdjustments);
        const progressionSummary = await progressionSummaryService.generateProgressionSummaryForUserId(userId);
        return {
            progression: lastProgression,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        throw err;
    }
}

async function resetProgression(userId, curriculumId) {
    try {
        const user = await User.findById(userId);
        return await user.resetProgression();
    } catch (err) {
        throw err;
    }
}

