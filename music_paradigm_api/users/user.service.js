﻿const bcrypt = require('bcryptjs');
const db = require('database/db');
const timeout = require('_helpers/timeout')
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
 * @constant 
 * @type {number}
*/
const DATABASE_TIMEOUT = 10000;


/**
 * Method for authenticating a user attempting to login
 * @param {string} username     The date
 * @param {string} password     The password (non-encrypted)
 * @return {Object}             The user without hash of its password and the token
 *                              If the authentication fails, it returns null
 */
async function authenticate({ username, password }) {

    // Fetch user in the database
    const user = await User.findOne({ username });

    // Validate username
    if (user === null) return null;

    // Validate password
    const { passwordHash, ...userWithoutPasswordHash } = user.toObject();
    if (!bcrypt.compareSync(password, passwordHash)) return null;

    // Create jwt token
    const token = jwt.generateToken(userWithoutPasswordHash);

    // Attach an experiment to the user
    // TODO: Put that in a different function ===>
    if (user.experimentFile.endsWith("json")) {
        userWithoutPasswordHash.experiment = require(`static/config/${user.experimentFile}`);
    } else {
        // read text files
        var fs = require('fs');
        // TODO: Take that away, we do not need a converter anymore
        const text2json = require('_helpers/text2json');
        try {
            const data = fs.readFileSync(`static/config/${user.experimentFile}`, 'utf8');
            userWithoutPasswordHash.experiment = text2json(data);
            // console.log(userWithoutPasswordHash.experiment.flow);
        } catch {
            console.error('config file not found, default exp1.json loaded');
            userWithoutPasswordHash.experiment = require(`static/config/exp1.json`);
        }
    }
    //  <===

    return {
        ...userWithoutPasswordHash,
        token
    };

}

async function getAll() {
    return await timeout.dbQuery(
        User.find().select('-passwordHash'));
}

async function getById(id) {
    return await timeout.dbQuery(
        User.findById(id).select('-passwordHash'));
}

async function create(userParam) {

    // Validate the uniqueness of the username
    const document = await timeout.dbQuery(
        User.findOne({ username: userParam.username }));
    if (document) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // Create the new user
    const user = new User(userParam);

    // Hash the password
    if (userParam.password) {
        user.passwordHash = bcrypt.hashSync(userParam.password, 10);
    }

    // Save the user
    await timeout.dbQuery(user.save());
}

async function update(id, userParam) {
    
    // Fetch the user in the database
    const user = await timeout.dbQuery(User.findById(id));

    // Validate the user
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // Hash password if it was entered
    if (userParam.password) {
        userParam.passwordHash = bcrypt.hashSync(userParam.password, 10);
    }

    // Copy userParam properties to user
    Object.assign(user, userParam);

    // Save the user
    await timeout.dbQuery(user.save());
}

async function _delete(id) {
    await timeout.dbQuery(
        User.findByIdAndRemove(id));
}