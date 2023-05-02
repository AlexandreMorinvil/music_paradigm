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

async function downloadTaskDataCsv(query) {
    const data = await TaskDataModel.getFileRelevantDataForCsv(query);
    return csvConverter.makeCsv(data);
}

async function downloadTaskDataJson(query) {
    const data = await TaskDataModel.getFileRelevantData(query);
    return jsonConverter.makeJson(data);
}

async function getTaskDataEntryById(taskDataEntryId) {
    const data = await TaskDataModel.getTaskDataEntryById(taskDataEntryId);
    const taskDataEntry = jsonConverter.makeJson(data);
    return {
        taskDataEntry,
    }
}

async function getTaskDataSummariesList(query) {
    const summariesList = await generateTaskDataSummariesList(query);
    return {
        summariesList,
    };
}
