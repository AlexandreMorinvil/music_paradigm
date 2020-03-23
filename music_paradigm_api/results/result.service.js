const db = require('_helpers/db');
const Collection= db.Result;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Collection.find().select('-hash');
}

async function getById(id) {
    return await Collection.findById(id).select('-hash');
}

async function create(param) {
    const collection = new Collection(param);

    // save user
    await collection.save();
}

async function update(id, param) {
    const collection = await Collection.findById(id);

    // validate
    if (!collection) throw 'Collection not found';

    // copy param properties to collection
    Object.assign(collection, param);

    await collection.save();
}

async function _delete(id) {
    await Collection.findByIdAndRemove(id);
}