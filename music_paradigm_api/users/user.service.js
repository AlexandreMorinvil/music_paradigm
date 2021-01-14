const db = require('database/db');
const Progression = db.Progression;
const User = db.User;

// Exports
module.exports = {
    getAll,
    getById,
    create,
    assignCurriculum,
    updateProgression,
    resetProgression,
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
        const user = await new User(userParam);
        await user.save();
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

async function assignCurriculum(userId, curriculumId) {
    try {
        const user = await User.findById(userId);
        return await user.initializeCurriculum(curriculumId);
    } catch (err) {
        throw err;
    }
}

async function updateProgression(userId, parameters) {
    try {
        const user = await User.findById(userId);
        return await user.updateCurriculum(parameters);
    } catch (err) {
        throw err;
    }
}

async function resetProgression(userId, curriculumId) {
    try {
        const user = await User.findById(userId);
        return await user.resetProgression();
    } catch (err) {
        throw err;
    }
}

