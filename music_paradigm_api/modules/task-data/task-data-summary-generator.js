const TaskDataModel = require('database/db').LogThorough;
const AdminTaskDataModel = require('database/db').AdminLogThorough;
const TaskDataSummary = require('modules/task-data/class/task-data-summary.class');

// Exports
module.exports = {
    generateTaskDataSummariesList,
};

async function generateTaskDataSummariesList(query, isAdminData = false) {
    const taskDataSummariesList = [];
    const Model = isAdminData ? AdminTaskDataModel : TaskDataModel;
    const taskDataObjectList = await Model.makeSummaryList(query);
    taskDataObjectList.map((taskDataObject) => {
        taskDataSummariesList.push(new TaskDataSummary(taskDataObject));
    });
    return taskDataSummariesList;
};