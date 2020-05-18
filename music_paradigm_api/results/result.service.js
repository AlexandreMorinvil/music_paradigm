const db = require('database/db');
const timeout = require('_helpers/timeout')
const Collection= db.Result;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await timeout.dbQuery(
        Collection.find().select('-hash'));
}

async function getById(id) {
    return await timeout.dbQuery(
        Collection.findById(id).select('-hash'));
}

async function create(param) {
    const collection = new Collection(param);
    await timeout.dbQuery(
        collection.save());
}

async function update(id, param) {
    const collection = await timeout.dbQuery(
        Collection.findById(id));

    // Validate
    if (!collection) throw 'Collection not found';

    // Copy param properties to collection
    Object.assign(collection, param);
    await timeout.dbQuery(collection.save());
}

async function _delete(id) {
    await timeout.dbQuery(
        Collection.findByIdAndRemove(id));
}