// TODO: Rename the model/schema as TaskStateMarker (this is a change that needs to be done carefully to ensure that 
//       current users of the application are not affected) 
const TaskStateMarkerModel = require('database/db').ExperimentMarker; 
const { 
    generateProgressionSessionsStatusForProgressionId 
} = require('modules/progressions/progression-sessions-status');

module.exports = {
    deleteTaskStateMarker,
    resetSessionTimer,
};

async function resetSessionTimer(progressionId, associativeId) {
    try {
        await TaskStateMarkerModel.resetSessionTimer(progressionId, associativeId);
        const progressionSessionsStatus = await generateProgressionSessionsStatusForProgressionId(progressionId);
        return {
            progressionSessionsStatus,
        }
    } catch (err) {
        throw err;
    }
}

async function deleteTaskStateMarker(progressionId, associativeId) {
    try {
        await TaskStateMarkerModel.deleteTaskStateMarker(progressionId, associativeId);
        const progressionSessionsStatus = await generateProgressionSessionsStatusForProgressionId(progressionId);
        return {
            progressionSessionsStatus,
        }
    } catch (err) {
        throw err;
    }
}