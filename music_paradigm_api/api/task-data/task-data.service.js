const TaskDataModel = require('database/db').LogThorough;
const { generateTaskDataSummariesList } = require('modules/task-data/task-data-summary-generator');

const csvConverter = require('modules/task-data/csv-converter');
const jsonConverter = require('modules/task-data/json-converter');

// Exports
module.exports = {
    downloadTaskDataCsv,
    getTaskDataSummariesList,
};

async function downloadTaskDataCsv(query) {
    let data = await TaskDataModel.getFileRelevantDataForCsv(query);
    return csvConverter.makeCsv(data);
}

async function getTaskDataSummariesList(query) {
    const summariesList = await generateTaskDataSummariesList(query);
    return {
        summariesList,
    };
}
