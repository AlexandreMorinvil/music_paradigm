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
        const progressionSessionsStatus = await generateProgressionSessionsStatusForProgressionId(progressionId);
        return {
            progression: lastProgression,
            progressionSessionsStatus: progressionSessionsStatus,
        };
    } catch (err) {
        throw err;
    }
}

async function assignCurriculum(userId, curriculumId, assignedParameters) {
    try {
        ProgressionModel.deleteNotStartedProgressionsOfUser(userId);
        const newProgression = await ProgressionModel.createProgression(userId, curriculumId, assignedParameters);
        const progressionSessionsStatus = 
            await generateProgressionSessionsStatusForProgression(newProgression); 
        return {
            progression: newProgression,
            progressionSessionsStatus: progressionSessionsStatus,
        };
    } catch (err) {
        throw err;
    }
}

async function assignParameters(progressionId, assignedParameters) {
    try {
        const progression = await ProgressionModel.assignParametersToProgression(progressionId, assignedParameters);
        const progressionSessionsStatus = await generateProgressionSessionsStatusForProgression(progression);
        return {
            progression: progression,
            progressionSessionsStatus: progressionSessionsStatus,
        };
    } catch (err) {
        throw err;
    }
}