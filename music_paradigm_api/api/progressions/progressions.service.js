const ProgressionModel = require('database/db').Progression;
const UserModel = require('database/db').User;

const progressionSummaryService = require('modules/progressions/progressions-summary.service');

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
        // Assign new progression to user
        const newProgression = await ProgressionModel.createProgression(userId, curriculumId, assignedParameters);
        ProgressionModel.deleteNotStartedProgressionsOfUser(userId);
        // TODO: Create a function that works without the ID
        // TODO: Rename the "ProgressionSummary" to another name, not to be confused with the real summaries used for lists
        const progressionSummary = await progressionSummaryService.generateProgressionSummaryForProgression(newProgression); 
        return {
            progression: newProgression,
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