const ProgressionsModel = require('database/db').Progression;

module.exports = {
    assignAdjustments,
    assignCurriculum,
    assignParameters,
};

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