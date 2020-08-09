const db = require('database/db');
const timeout = require('_helpers/timeout');
const e = require('express');
const Experiment = db.Experiment;

module.exports = {
    create,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

async function create(experiment) {
    // let createdExperiment;
    let createdExperiment = new Experiment(experiment);
    try {
        createdExperiment = await createdExperiment.save(experiment);
    } catch (err) {
        switch (err.code) {
            case 11000:
                return new Error(`In the group "${ experiment.group || "Default" }", the experiment "${ experiment.name }" version ${ experiment.version || 1 } already exists`);
            default:
                return err;
        }
    }

    return {
        experiment: createdExperiment.getDefinition()
    }
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