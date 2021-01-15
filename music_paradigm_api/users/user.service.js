const db = require('database/db');
const Progression = db.Progression;
const User = db.User;

// Exports
module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
    assignCurriculum,
    updateProgression,
    resetProgression,
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

async function createUser(userParameters) {
    try {
        const { user, curriculum } = userParameters;
        const userCreated = await User.create(user);
        await userCreated.initializeCurriculum(curriculum);
        return userCreated;
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username and/or the email address is already used`);
            default:
                throw err;
        }
    }
}

async function updateUser(id, userParameters) {
    try {
        const user = await User.findById(id);
        return await user.updateUser(userParameters);
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`The username and/or the email address is already used`);
            default:
                throw err;
        }
    }
}

async function deleteUser(userId) {
    try {
        return await User.delete(userId);
    } catch (err) {
        throw err;
    }

}

async function assignCurriculum(userId, curriculumId) {
    try {
        const user = await User.findById(userId);
        await user.initializeCurriculum(curriculumId);
        return user;
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

