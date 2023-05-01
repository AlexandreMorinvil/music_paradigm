const TaskDataModel = require('database/db').LogThorough;
const { generateTaskDataSummariesList } = require('modules/task-data/task-data-summary-generator');

// Exports
module.exports = {
    getTaskDataSummariesList,
};

async function getTaskDataSummariesList(query) {
    try {
        const summariesList = await generateTaskDataSummariesList(query);
        return {
            summariesList,
        };
    } catch (err) {
        throw err;
    }
}
