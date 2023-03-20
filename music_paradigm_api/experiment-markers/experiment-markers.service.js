const ExperimentMarker = require('database/db').ExperimentMarker;
const { 
    generateProgressionSessionsStatusForProgressionId 
} = require('modules/progressions/progression-sessions-status');

module.exports = {
    resetTimeIndicated,
    delete: _delete
};

async function resetTimeIndicated(progressionId, associativeId) {
    try {
        await ExperimentMarker.forgetTimeLeft(progressionId, associativeId);
        const progressionSessionsStatus = await generateProgressionSessionsStatusForProgressionId(progressionId);
        return progressionSessionsStatus;
    } catch (err) {
        throw err;
    }
}

async function _delete(progressionId, associativeId) {
    try {
        await ExperimentMarker.deleteMarker(progressionId, associativeId);
        const progressionSessionsStatus = await generateProgressionSessionsStatusForProgressionId(progressionId);
        return progressionSessionsStatus;
    } catch (err) {
        throw err;
    }
}