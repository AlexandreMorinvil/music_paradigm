const ExperimentMarker = require('database/db').ExperimentMarker;
const { generateProgressionSummaryForProgressionId } = require('progressions/progressions-summary.service');

module.exports = {
    resetTimeIndicated,
    delete: _delete
};

async function resetTimeIndicated(progressionId, associativeId) {
    try {
        await ExperimentMarker.forgetTimeLeft(progressionId, associativeId);
        const progressionSummary = await generateProgressionSummaryForProgressionId(progressionId);
        return progressionSummary;
    } catch (err) {
        throw err;
    }
}

async function _delete(progressionId, associativeId) {
    try {
        await ExperimentMarker.deleteMarker(progressionId, associativeId);
        const progressionSummary = await generateProgressionSummaryForProgressionId(progressionId);
        return progressionSummary;
    } catch (err) {
        throw err;
    }
}