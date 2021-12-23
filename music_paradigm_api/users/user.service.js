const db = require('database/db');
const progressionSummaryService = require('progressions/progression-summary.service');
const User = db.User;

// Exports
module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
    assignCurriculum,
    assignParameters,
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
        const progressionSummary = await progressionSummaryService.generateProgressionSummary(userId);
        return {
            user: user,
            progression: lastProgression,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        throw err;
    }
}

async function createUser(user, curriculumId, assignedParameters) {
    try {
        const userCreated = await User.create(user);
        const progressionInitilized = await userCreated.initializeCurriculum(curriculumId, assignedParameters);
        const progressionSummary = await progressionSummaryService.generateProgressionSummary(userCreated._id);
        return {
            user: userCreated, 
            progression: progressionInitilized,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username and/or the email address is already used`);
            default:
                throw err;
        }
    }
}

async function updateUser(userId, userParameters) {
    try {
        const user = await User.findById(userId);
        return await user.updateUser(userParameters);
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username and/or the email address is already used`);
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
        const lastProgression = await user.initializeCurriculum(curriculumId, assignedParameters);
        const progressionSummary = await progressionSummaryService.generateProgressionSummary(userId);
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
        const user = await User.findById(userId);
        const lastProgression = await user.assignParameters(assignedParameters);
        const progressionSummary = await progressionSummaryService.generateProgressionSummary(userId);
        return { 
            user: user, 
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

