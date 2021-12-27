const csvConverter = require('_helpers/csv-converter');

const db = require('database/db');
const AdminLogThorough = db.AdminLogThorough;
const LogThorough = db.LogThorough;
const User = db.User;



// Exports
module.exports = {
    initializeLog,
    addLogBlock,
    concludeLog,
    getUserLogSummaryList,
    makeUserLogCsv,
    makeAdminLogCsv,
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

async function getUserLogSummaryList(userId, progressionId, associativeId) {
    try {
        const query = { userId: userId };
        if (progressionId) query.progressionId = progressionId;
        if (associativeId) query.associativeId = associativeId;
        if (await User.isAdmin(userId)) return await AdminLogThorough.makeSummaryList(query);
        else return await LogThorough.makeSummaryList(query);
    } catch (err) {
        throw err;
    }
}

async function makeUserLogCsv(query) {
    try {
        let data = await LogThorough.find(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}

async function makeAdminLogCsv(query) {
    try {
        let data = await AdminLogThorough.find(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}