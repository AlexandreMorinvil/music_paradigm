const AdminTaskDataModel = require('database/db').AdminLogThorough;
const TaskDataModel = require('database/db').LogThorough;
const { generateTaskDataSummariesList } = require('modules/task-data/task-data-summary-generator');

const csvConverter = require('modules/task-data/csv-converter');
const jsonConverter = require('modules/task-data/json-converter');

// Exports
module.exports = {
    downloadTaskDataCsv,
    downloadTaskDataJson,
    getTaskDataEntryById,
    getTaskDataSummariesList,
};

async function downloadTaskDataCsv(query, isAdminData = false) {
    const Model = isAdminData ? AdminTaskDataModel : TaskDataModel;
    const data = await Model.getFileRelevantDataForCsv(query);
    return csvConverter.makeCsv(data);
}

async function downloadTaskDataJson(query, isAdminData = false) {
    const Model = isAdminData ? AdminTaskDataModel : TaskDataModel;
    const data = await Model.getFileRelevantData(query);
    return jsonConverter.makeJson(data);
}

async function getTaskDataEntryById(taskDataEntryId, isAdminData = false) {
    const Model = isAdminData ? AdminTaskDataModel : TaskDataModel;
    const data = await Model.getTaskDataEntryById(taskDataEntryId);
    const taskDataEntry = jsonConverter.makeJson(data);
    return {
        isAdminData,
        taskDataEntry,
    }
}

async function getTaskDataSummariesList(query, isAdminData = false) {
    const summariesList = await generateTaskDataSummariesList(query, isAdminData);
    return {
        isAdminData,
        summariesList,
    };
}
