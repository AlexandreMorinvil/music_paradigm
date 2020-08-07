const db = require('database/db');
const timeout = require('_helpers/timeout')
const Experiment = db.Experiment;

module.exports = {
    create,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

async function create(description) {
    const experiment = new Experiment(description);
    let value;
    try {
        value = await experiment.save();
    } catch (e) {
        return e;
    }
    return {
        experiment: value
    }
    // await timeout.dbQuery(experiment.save());
    // console.log(experiment);
}

// async function getAll() {
//     return await timeout.dbQuery(
//         Collection.find().select('-passwordHash'));
// }

// async function getById(id) {
//     return await timeout.dbQuery(
//         Collection.findById(id).select('-passwordHash'));
// }

// async function create(param) {
//     const collection = new Collection(param);
//     await timeout.dbQuery(
//         collection.save());
// }

// async function update(id, param) {
//     const collection = await timeout.dbQuery(
//         Collection.findById(id));

//     // Validate
//     if (!collection) throw 'Collection not found';

//     // Copy param properties to collection
//     Object.assign(collection, param);
//     await timeout.dbQuery(collection.save());
// }

// async function _delete(id) {
//     await timeout.dbQuery(
//         Collection.findByIdAndRemove(id));
// }