const db = require('database/db');
const timeout = require('_helpers/timeout');
const e = require('express');
const Experiment = db.Experiment;

module.exports = {
    create,
    getListAllHeaders,
    getById,
    getDescriptionFromId,
    update,
    // delete: _delete
};

async function getListAllHeaders() {
    try {
        return await Experiment.getListAllHeaders();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return await Experiment.findById(id);
    } catch (err) {
        throw err;
    }
}

async function getDescriptionFromId(id) {
    try {
        const exeperiment = await Experiment.findById(id);
        return await exeperiment.getDefinition();
    } catch (err) {
        throw err;
    }
}

async function create(experiment) {
    try {
        const createdExperiment = await Experiment.create(experiment);
        return await createdExperiment.getDefinition();
    } catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`In the group "${experiment.group || "default"}", the experiment "${experiment.name}" version ${experiment.version || 1} already exists`);
            default:
                throw err;
        }
    }
}

async function update(id, description) {
    try {
        // Retreive the experiemtn to update
        const experiment = await Experiment.findById(id);
        if (!experiment) throw new Error('Experiment to update not found');

        // Update the experiment
        experiment = {};
        Object.assign(experiment, description);
        return experiment.save();
    }
    catch (err) {
        switch (err.code) {
            case 11000:
                throw new Error(`In the group "${description.group || "default"}", the experiment "${description.name}" version ${description.version || 1} already exists`);
            default:
                throw err;
        }
    }

}


// async function _delete(id) {
//     await timeout.dbQuery(
//         Collection.findByIdAndRemove(id));
// }