const db = require('database/db');
const AdminLogSimple = db.AdminLogSimple;
const LogSimple = db.LogSimple;
const User = db.User;

// Exports
module.exports = {
    addBlock,
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
