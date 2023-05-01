const TaskDataModel = require('database/db').LogThorough;
const TaskDataSummary = require('modules/task-data/class/task-data-summary.class');

// Exports
module.exports = {
    generateTaskDataSummariesList,
};

async function generateTaskDataSummariesList(query) {
    const taskDataSummariesList = [];
    const taskDataObjectList = await TaskDataModel.makeSummaryList(query);
    taskDataObjectList.map((taskDataObject) => {
        taskDataSummariesList.push(new TaskDataSummary(taskDataObject));
    });
    return taskDataSummariesList;
};