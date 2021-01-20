const db = require('database/db');
const AdminLogSimple = db.AdminLogSimple;
const LogSimple = db.LogSimple;
const User = db.User;

// Exports
module.exports = {
    addBlock,
};

async function addBlock(id, block) {
    try {
        if (await User.isAdmin(id)) return await AdminLogSimple.addBlock(block);
        else return await LogSimple.addBlock(block);
    } catch (err) {
        throw err;
    }
}
