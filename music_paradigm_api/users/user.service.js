const bcrypt = require('bcryptjs');
const db = require('database/db');
const jwt = require('jwt/jwt');
const User = db.User;

// Exports
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

/**
 * Method for authenticating a user attempting to login
 * @param {string} username     The date
 * @param {string} password     The password (non-encrypted)
 * @return {Object}             The user without hash of its password and the token
 *                              If the authentication fails, it returns null
 */
async function authenticate({ username, password }) {
    try {
        const userWithoutPassword = await User.authenticate(username, password);
        const token = jwt.generateToken(userWithoutPassword);
        
        return {
            ...userWithoutPassword,
            token
        };
    } catch (err) {
        if (!err.message)
            throw new Error("Username or password is incorrect");
        else
            throw err;
    }
}

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
        // Validate the uniqueness of the username
        // const document = await User.findOne({ username: userParam.username });
        // if (document) throw new Error('Username "' + userParam.username + '" is already taken');

        // Create the new user
        const user = new User(userParam);

        // Save the user
        return await user.save();
    } catch (err) {
        throw err;
    }
}

async function update(id, userParam) {
    try {
        // Fetch the user in the database
        const user = await User.findById(id);

        // Validate the user
        if (!user) throw new Error('User not found');
        if (user.username !== userParam.username && await User.findOne({ username: userParam.username }))
            throw new Error('Username "' + userParam.username + '" is already taken');

        // Copy userParam properties to user
        Object.assign(user, userParam);

        // Save the user
        return user.save();
    } catch (err) {
        throw err;
    }
}

async function _delete(id) {
    try {
        // Retreive the user to update
        const user = await User.findById(id);
        if (!user) throw new Error('User to delete not found');

        // Remove the experiment
        return await user.remove();
    } catch (err) {
        throw err;
    }

}