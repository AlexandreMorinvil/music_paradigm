const db = require('database/db');
const AdminLogSimple = db.AdminLogSimple;
const AdminLogThorough = db.AdminLogThorough;

// Exports
module.exports = {
    createSimpleLog,
    initialize,
    addBlock,
};

async function createSimpleLog(logInformation) {
    try {
        const adminSimpleLog = new AdminLogSimple(logInformation);
        return await adminSimpleLog.create();
    } catch (err) {
        throw err;
    }
}

async function initialize(adminSessionToCreate) {
    try {
        const adminSession = new AdminLogThorough(adminSessionToCreate);
        return await adminSession.create();
    } catch (err) {
        throw err;
    }
}

async function addBlock(id, block) {
    try {
        const adminSession = await AdminLogThorough.findById(id);
        return await adminSession.addBlock(block);
    } catch (err) {
        throw err;
    }
}

async function initializeLog(user, logInformation) {
    try {
        if(user.role === "admin")
    } catch (err) {

    }
}