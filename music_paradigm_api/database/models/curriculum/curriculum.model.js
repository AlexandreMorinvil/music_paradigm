const mongoose = require('mongoose');

const CurriculumSummary = require('modules/curriculum/class/curriculum-summary.class');
const CurriculumTaskParameter = require('modules/curriculum/class/curriculum-task-parameter.class');
const schema = require('./curriculum.middleware');

schema.set('toJSON', { virtuals: true });

// Static methods

/**
 * Get curriculum list entries list
 * This function returns  a list of all the the curriculum list entries. A curriculum list entry is a curriculum objects
 * to which is added additional information regarding the parameters included in the tasks that are included in the 
 * curriculum.
 * 
 * @return {Array<Object>} A list of all the curriculum objects with parameter's infomration added.
 */
schema.statics.getCurriculumSummariesList = async function () {

    // Get the list of all curriculum documents.
    const curriculumDocumentsList = await this.find({}).sort({ title: 1 });
    const curriculumSummariesList = [];

    // Fill the list of curriculum summaries asynchronously.
    await Promise.all(curriculumDocumentsList.map(async (curriculumDocument) => {
        curriculumSummariesList.push(
            new CurriculumSummary({
                parametersList: await curriculumDocument.getParametersList(),
                ...curriculumDocument.toObject(),
            })
        );
    }));

    // Returns alist of all the curriculum objects
    return curriculumSummariesList;
};

// Instance methods

/**
 * Get experiment associated
 * This function returns the document of the experiment associated to an associative ID.
 * 
 * @param {String} associativeId Associative ID that associates an experiement to an experiemnt in a curriculum.
 * @returns the document of the experiment associated to an associative ID.
 */
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

/**
 * Get parammeters
 * 
 * Extract all the variables with the type "parameter" from all the experiments in the curriculum and adds returns an
 * object containing their option values, their default value and and indicator of whether or not those variables can
 * be assigned a value inputed as a free text value.
 * 
 * @return {Object} Informations on the parameters involved in the curriculum.
 */
schema.methods.getParametersList = async function () {

    // Initialize the return values.
    const acceptsFreeTextValuesMap = {};
    const optionValuesListMap = {};

    // Retreive the list of all the "variables" attributes from all the experiments of the curriculum.
    const curriculum = await model
        .findOne(
            { _id: this._id },
            { 'experiments.experimentReference': 1 }
        )
        .populate(
            { path: 'experiments.experimentReference', select: 'variables' }
        )
    const curriculumSessionsList = curriculum.experiments;
    const variableAttributeInTasksList = curriculumSessionsList.map(
        curriculumSession => curriculumSession.experimentReference
    );

    // Parse the variables of type "parameter" among the variables in all the experiments.
    const listOfparametersListFromTasks = [];
    variableAttributeInTasksList.forEach((task) => listOfparametersListFromTasks.push(task.getParametersList()));

    listOfparametersListFromTasks.forEach(parametersListFromTasks => {
        parametersListFromTasks.forEach(parameterVariable => {
            const { assignedValue, acceptsFreeTextValue, name, optionValues } = parameterVariable

            // List all the option values taking into account the explicitly state option values of the variable and
            // including the assign value (which isn't necessarily included in the option vlaues).
            if (!optionValuesListMap[name]) optionValuesListMap[name] = [];
            optionValuesListMap[name] = optionValuesListMap[name].concat(optionValues);
            optionValuesListMap[name] = optionValuesListMap[name].concat(assignedValue);
            optionValuesListMap[name] = [...new Set(optionValuesListMap[name])];

            // Indicate whether or not the variable accepts free text value assignation.
            acceptsFreeTextValuesMap[name] = Boolean(acceptsFreeTextValuesMap[name] || acceptsFreeTextValue);
        });
    });

    // Wrap the values in TaskParameterValue objects
    const parametersList = [];
    for (const parameterName in optionValuesListMap)
        parametersList.push(new CurriculumTaskParameter({
            name: parameterName,
            optionValuesList: optionValuesListMap[parameterName],
            acceptsFreeTextValues: acceptsFreeTextValuesMap[parameterName],
        }));

    // Return the parameters list
    return parametersList;
}

// Creating the model
const model = mongoose.model('Curriculum', schema);

module.exports = model;