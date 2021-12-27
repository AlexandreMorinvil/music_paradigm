const db = require('database/db');
const AdminLogSimple = db.AdminLogSimple;
const LogSimple = db.LogSimple;
const User = db.User;

// Exports
module.exports = {
    addBlock,
    getUserLogSummaryList,
    makeUserLogCsv,
    makeAdminLogCsv,
};

async function addBlock(userId, block) {
    try {
        let addedBlock = null;
        if (await User.isAdmin(userId)) {
            addedBlock = await AdminLogSimple.addBlock(block);
        } else {
            addedBlock = await LogSimple.addBlock(block);
        }
        return addedBlock;
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