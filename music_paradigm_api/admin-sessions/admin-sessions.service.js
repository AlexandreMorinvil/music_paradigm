const db = require('database/db');
const AdminSimpleLog = db.AdminSimpleLog;
const AdminSession = db.AdminSession;

// Exports
module.exports = {
    createSimpleLog,
    initialize,
    addBlock,
};

// async function getAll() {
//     try {
//         return await AdminSession.getListAllHeaders();
//     } catch (err) {
//         throw err;
//     }
// }

// async function getById(id) {
//     try {
//         return await AdminSession.findById(id);
//     } catch (err) {
//         throw err;
//     }
// }

async function createSimpleLog(logInformation) {
    try {
        const adminSimpleLog = new AdminSimpleLog(logInformation);
        return await adminSimpleLog.create();
    } catch (err) {
        throw err;
    }
}

async function initialize(adminSessionToCreate) {
    try {
        const adminSession = new AdminSession(adminSessionToCreate);
        return await adminSession.create();
    } catch (err) {
        throw err;
    }
}

async function addBlock(id, block) {
    try {
        const adminSession = await AdminSession.findById(id);
        return await adminSession.addBlock(block);
    } catch (err) {
        throw err;
    }
}

// async function _delete(id) {
//     try {
//         const adminSession = await AdminSession.findById(id);
//         if (!adminSession) throw new Error('The admin session to delete could not be found');
//         return await adminSession.remove();
//     } catch (err) {
//         throw err;
//     }

// }