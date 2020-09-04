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
        // Fetch user in the database
        const user = await User.findOne({ username });
        if (!user) throw new Error;

        // Validate password
        const { passwordHash, ...userWithoutPasswordHash } = user.toObject();
        if (!bcrypt.compareSync(password, passwordHash)) throw new Error;

        // Create jwt token
        const token = jwt.generateToken(userWithoutPasswordHash);

        return {
            ...userWithoutPasswordHash,
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
        return await User.find().select('-passwordHash');
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return await User.findById(id).select('-passwordHash');
    } catch (err) {
        throw err;
    }

}

async function create(userParam) {
    try {
        // Validate the uniqueness of the username
        const document = await User.findOne({ username: userParam.username });
        if (document)
            throw new Error('Username "' + userParam.username + '" is already taken');

        // Create the new user
        const user = new User(userParam);

        // Hash the password
        user.passwordHash = bcrypt.hashSync(userParam.password, 10);

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

        // FIXME : Let the database validate the update when saving instead of validating manually
        // Validate the user
        if (!user) throw new Error('User not found');
        if (user.username !== userParam.username && await User.findOne({ username: userParam.username }))
            throw new Errpr('Username "' + userParam.username + '" is already taken');

        // Hash password if it was entered
        if (userParam.password)
            userParam.passwordHash = bcrypt.hashSync(userParam.password, 10);

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