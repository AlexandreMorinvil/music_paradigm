const db = require('database/db');
const AdminLogThorough = db.AdminLogThorough;
const LogThorough = db.LogThorough;
const User = db.User;

// Exports
module.exports = {
    initializeLog,
    addLogBlock,
    concludeLog
};

async function initializeLog(userId, logInformation) {
    try {
        let initializedLog = null;
        if (await User.isAdmin(userId)) {
            initializedLog = await AdminLogThorough.initializeLog(logInformation);
        } else {
            initializedLog = await LogThorough.initializeLog(logInformation);
            const associativeId = logInformation.associativeId;
            await User.recordThoroughLog(userId, associativeId, initializedLog);
        }
        return initializedLog._id;
    } catch (err) {
        throw err;
    }
}

async function addLogBlock(userId, logId, block) {
    try {
        let addedBlock = null;
        if (await User.isAdmin(userId)) {
            addedBlock = await AdminLogThorough.addLogBlock(logId, block);
        } else {
            addedBlock = await LogThorough.addLogBlock(logId, block);
        }
        return logId;
    } catch (err) {
        throw err;
    }
}

async function concludeLog(userId, logId, logConclusion) {
    try {
        let addedBlock = null;
        if (await User.isAdmin(userId)) {
            addedBlock = await AdminLogThorough.concludeLog(logId, logConclusion);
        } else {
            addedBlock = await LogThorough.concludeLog(logId, logConclusion);
        }
        return logId;
    } catch (err) {
        throw err;
    }
}


