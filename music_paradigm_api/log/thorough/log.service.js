const AdminLogThorough = require('database/db').AdminLogThorough;
const LogThorough = require('database/db').LogThorough;
const User = require('database/db').User;

const csvConverter = require('_helpers/csv-converter');
const jsonConverter = require('_helpers/json-converter');
const { makeMongooseLogQuery } = require('log/log-query-maker.service')


// Exports
module.exports = {
    initializeLog,
    addLogBlock,
    concludeLog,
    getOneUserLogFromId,
    getOneAdminLogFromId,
    getAdminLogSummaryList,
    getUserLogSummaryList,
    makeAdminLogCsv,
    makeUserLogCsv,
    makeAdminLogJson,
    makeUserLogJson,
};

async function initializeLog(userId, logHeader) {
    try {
        if (await User.isAdmin(userId)) await AdminLogThorough.initializeLog(logHeader);
        else await LogThorough.initializeLog(logHeader);
        return;
    } catch (err) {
        throw err;
    }
}

async function addLogBlock(userId, logHeader, block) {
    try {
        if (await User.isAdmin(userId)) await AdminLogThorough.addLogBlock(logHeader, block);
        else await LogThorough.addLogBlock(logHeader, block);
        return;
    } catch (err) {
        throw err;
    }
}

async function concludeLog(userId, logHeader, logConclusion) {
    try {
        if (await User.isAdmin(userId)) await AdminLogThorough.concludeLog(logHeader, logConclusion);
        else await LogThorough.concludeLog(logHeader, logConclusion);
        return;
    } catch (err) {
        throw err;
    }
}

async function getOneUserLogFromId(logId) {
    try {
        let data = await LogThorough.getOneLogFromId(logId);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}

async function getOneAdminLogFromId(logId) {
    try {
        let data = await AdminLogThorough.getOneLogFromId(logId);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}

async function getUserLogSummaryList(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        return await LogThorough.makeSummaryList(query);
    } catch (err) {
        throw err;
    }
}

async function getAdminLogSummaryList(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        return await AdminLogThorough.makeSummaryList(query);
    } catch (err) {
        throw err;
    }
}

async function makeUserLogCsv(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await LogThorough.getFileRelevantData(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}

async function makeAdminLogCsv(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await AdminLogThorough.getFileRelevantData(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}

async function makeUserLogJson(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await LogThorough.getFileRelevantData(query);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}

async function makeAdminLogJson(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await AdminLogThorough.getFileRelevantData(query);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}