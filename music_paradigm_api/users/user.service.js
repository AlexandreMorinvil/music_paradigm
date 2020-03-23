const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    const { hash, ...userWithoutHash } = user.toObject();
    if (hash) {
        if (!bcrypt.compareSync(password, hash)) return;
    }
    const token = jwt.sign({ sub: user.id }, config.secret);
    if (user.experimentFile.endsWith("json")) {
        userWithoutHash.experiment = require(`static/config/${user.experimentFile}`);
    } else {
        // read text files
        var fs = require('fs');
        const text2json = require('_helpers/text2json');
        try {
            const data = fs.readFileSync(`static/config/${user.experimentFile}`, 'utf8');
            userWithoutHash.experiment = text2json(data);
            // console.log(userWithoutHash.experiment.flow);
        } catch {
            console.error('config file not found, default exp1.json loaded');
            userWithoutHash.experiment = require(`static/config/exp1.json`);
        }
    }
    
    return {
        ...userWithoutHash,
        token
    };
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    // console.log(userParam);
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}