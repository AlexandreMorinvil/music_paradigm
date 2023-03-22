const ProgressionModel = require('database/db').Progression;

const {
    generateProgressionSessionsStatusForProgression,
    generateProgressionSessionsStatusForProgressionId,
} = require('modules/progressions/progression-sessions-status');

module.exports = {
    assignCurriculum,
    assignParameters,
    assignSessionAdjustments,
};

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

async function assignSessionAdjustments(progressionId, sessionIdentifier, adjustments) {
    try {
        const progression = await ProgressionModel.assignSessionAdjustmentsToProgression(
            progressionId,
            sessionIdentifier,
            adjustments,
        );
        const progressionSessionsStatus = await generateProgressionSessionsStatusForProgression(progression);
        return {
            progression: progression,
            progressionSessionsStatus: progressionSessionsStatus,
        };
    } catch (err) {
        throw err;
    }
}