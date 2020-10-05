const bcrypt = require('bcryptjs');
const db = require('database/db');
const User = db.User;

// Exports
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    try {
        return await User.getListAllHeaders();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return await User.findById(id).select('-password');
    } catch (err) {
        throw err;
    }
}

async function create(userParam) {
    try {
        const user = new User(userParam);
        return await user.create();
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username and/or the email address is already used`);
            default:
                throw err;
        }
    }
}

async function update(id, userIdentity) {
    try {
        const user = await User.findById(id);
        return await user.updateIdentity(userIdentity);
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username and/or the email address is already used`);
            default:
                throw err;
        }
    }
}

async function _delete(id) {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('User to delete not found');
        
        return await user.remove();
    } catch (err) {
        throw err;
    }

}