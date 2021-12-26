const mongoose = require('mongoose');
const schema = require('./curriculum.middleware');

schema.set('toJSON', { virtuals: true });

// Static methods
schema.statics.getListAllHeaders = async function () {
    const curriculumDocumentsList = await this
        .find({})
        .sort({ updatedAt: -1, createdAt: 1, title: 1 });
    const curriculumObjectsList = [];

    for (element of curriculumDocumentsList) {
        let curriculum = element.toObject();
        const { optionVariableValues, defaultVariableAssignation } = await element.getParameters();
        curriculum['optionVariableValues'] = optionVariableValues;
        curriculum['defaultVariableAssignation'] = defaultVariableAssignation;
        curriculumObjectsList.push(curriculum);
    }
    return curriculumObjectsList;
};

// Instance methods
schema.methods.getExperimentAssociated = function (associativeId) {
    const experimentArrayCurriculum = this.experiments
        .filter(experiment => { return experiment.associativeId === associativeId; });
    const experimentInCurriculum = experimentArrayCurriculum[0];
    return experimentInCurriculum;
};

schema.methods.update = async function (updatedCurriculum) {
    if (updatedCurriculum.hasOwnProperty('title')) this.title = updatedCurriculum.title;
    if (updatedCurriculum.hasOwnProperty('logType')) this.logType = updatedCurriculum.logType;
    if (updatedCurriculum.hasOwnProperty('isSequential')) this.isSequential = updatedCurriculum.isSequential;
    if (updatedCurriculum.hasOwnProperty('experiments')) this.experiments = updatedCurriculum.experiments;

    return this;
};

schema.methods.getParameters = async function () {
    const allParameters = [];
    const formattedVariables = {};
    const defaultVariableAssignation = {};
    const curriculum = await model
        .findOne(
            { _id: this._id },
            { 'experiments.experimentReference': 1 }
        )
        .populate(
            { path: 'experiments.experimentReference', select: 'variables' }
        )
    const experimentsList = curriculum.experiments;
    const experimentDefinitionsList = experimentsList.map(experiment => experiment.experimentReference);
    experimentDefinitionsList.forEach((experiment) => allParameters.push(experiment.getParameters()))
    allParameters.forEach(variablesArray => {
        variablesArray.forEach(variable => {
            const { name, optionValues, assignedValue } = variable
            if (!defaultVariableAssignation[name]) defaultVariableAssignation[name] = assignedValue;

            if (!formattedVariables[name]) formattedVariables[name] = [];
            formattedVariables[name] = formattedVariables[name].concat(optionValues);
            formattedVariables[name] = formattedVariables[name].concat(assignedValue);
            formattedVariables[name] = [...new Set(formattedVariables[name])];
        });
    });
    return {
        optionVariableValues: formattedVariables,
        defaultVariableAssignation: defaultVariableAssignation
    };
}

// Creating the model
const model = mongoose.model('Curriculum', schema);

module.exports = model;