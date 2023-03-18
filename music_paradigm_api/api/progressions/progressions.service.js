const ProgressionModel = require('database/db').Progression;

const {
    generateProgressionSessionsStatusForProgression,
    generateProgressionSessionsStatusForProgressionId,
} = require('modules/progressions/progression-sessions-status');

module.exports = {
    assignAdjustments,
    assignCurriculum,
    assignParameters,
};

async function assignAdjustments(progressionId, assignedAdjustments) {
    try {
        const lastProgression = await userProgressionService.updateAdjustments(userId, assignedAdjustments);
        const progressionSummary = await generateProgressionSessionsStatusForProgressionId(progressionId);
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
        ProgressionModel.deleteNotStartedProgressionsOfUser(userId);
        const newProgression = await ProgressionModel.createProgression(userId, curriculumId, assignedParameters);
        const progressionSummary = 
            await generateProgressionSessionsStatusForProgression(newProgression); 
        return {
            progression: newProgression,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        throw err;
    }
}

async function assignParameters(progressionId, assignedParameters) {
    try {
        const progression = await ProgressionModel.assignParametersToProgression(progressionId, assignedParameters);
        const progressionSummary = await generateProgressionSessionsStatusForProgression(progression);
        return {
            progression: progression,
            progressionSummary: progressionSummary,
        };
    } catch (err) {
        throw err;
    }
}