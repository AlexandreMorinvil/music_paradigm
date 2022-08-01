const mongoose = require('mongoose');
const schema = require('./curriculum.middleware');

schema.set('toJSON', { virtuals: true });

// Static methods

/**
 * Get list all headers
 * This function returns  a list of all the curriculum objects to which is added additional information regarding the 
 * parameters included in the experimenrs.
 * 
 * @return {Array<Object>} A list of all the curriculum objects with parameter's infomration added.
 */
schema.statics.getListAllHeaders = async function () {

    // Retreive the list of all curriculum documents.
    const curriculumDocumentsList = await this
        .find({})
        .sort({ updatedAt: -1, createdAt: 1, title: 1 });
    const curriculumObjectsList = [];

    // Append the parameters information to all the curriculum objects. 
    for (curriculumDocument of curriculumDocumentsList) {
        
        let curriculumObject = curriculumDocument.toObject();
        const { 
            acceptsFreeTextVariableValues, 
            optionVariableValues, 
            defaultVariableAssignation 
        } = await curriculumDocument.getParameters();

        curriculumObject['optionVariableValues'] = optionVariableValues;
        curriculumObject['defaultVariableAssignation'] = defaultVariableAssignation;
        curriculumObject['acceptsFreeTextVariableValues'] = acceptsFreeTextVariableValues;
        curriculumObjectsList.push(curriculumObject);
    }

    // Returns alist of all the curriculum objects
    return curriculumObjectsList;
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
 * format :
 * {
 *      optionVariableValues: {
 *          VARIABLE_NAME: [ ... options ... ],
 *          VARIABLE_NAME: [ ... options ... ],
 *          ...
 *      },
 *      defaultVariableAssignation: {
 *          VARIABLE_NAME: DEFAULT_VALUE,
 *          VARIABLE_NAME: DEFAULT_VALUE,
 *          ...
 *      }
 *      acceptsFreeTextVariableValues: {
 *          VARIABLE_NAME: Boolean,
 *          VARIABLE_NAME: Boolean,
 *          ... 
 *      }
 * }
 */
schema.methods.getParameters = async function () {

    // Initialize the return values.
    const acceptsFreeTextValuesMap = {};
    const completeOptionValuesListMap = {};
    const defaultAssignedValueMap = {};

    // Retreive the list of all the "variables" attributes from all the experiments of the curriculum.
    const curriculum = await model
        .findOne(
            { _id: this._id },
            { 'experiments.experimentReference': 1 }
        )
        .populate(
            { path: 'experiments.experimentReference', select: 'variables' }
        )
    const referencExperimentsList = curriculum.experiments;
    const variableAttributeInExperimentsList = referencExperimentsList.map(
        experiment => experiment.experimentReference
    );

    // Parse the variables of type "parameter" among the variables in all the experiments.
    const parametersFullList = [];
    variableAttributeInExperimentsList.forEach((experiment) => parametersFullList.push(experiment.getParameters()))
    parametersFullList.forEach(variablesArray => {
        variablesArray.forEach(variable => {
            const { assignedValue, acceptsFreeTextValue, name, optionValues } = variable

            // Assign the default values a the first assigned value found for a given variable name in all the 
            // experiments of the curriculum.
            if (!defaultAssignedValueMap[name]) defaultAssignedValueMap[name] = assignedValue;

            // List all the option values taking into account the explicitly state option values of the variable and
            // including the assign value (which isn't necessarily included in the option vlaues).
            if (!completeOptionValuesListMap[name]) completeOptionValuesListMap[name] = [];
            completeOptionValuesListMap[name] = completeOptionValuesListMap[name].concat(optionValues);
            completeOptionValuesListMap[name] = completeOptionValuesListMap[name].concat(assignedValue);
            completeOptionValuesListMap[name] = [...new Set(completeOptionValuesListMap[name])];

            // Indicate whether or not the variable accepts free text value assignation.
            if (!acceptsFreeTextValuesMap[name]) acceptsFreeTextValuesMap[name] = acceptsFreeTextValue;
        });
    });

    // Return informations of the parameters involved in the curriculum.
    return {
        optionVariableValues: completeOptionValuesListMap,
        defaultVariableAssignation: defaultAssignedValueMap,
        acceptsFreeTextVariableValues: acceptsFreeTextValuesMap
    };
}

// Creating the model
const model = mongoose.model('Curriculum', schema);

module.exports = model;