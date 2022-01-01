// Exports
module.exports = {
    makeMongooseLogQuery,
};

function makeMongooseLogQuery(criterias) {
    const {
        userCriterias,
        progressionCriterias,
        associativeIdCriterias,
        logLabelCriterias,
        completionCountCriterias,
        curriculumCriterias,
        experimentCriterias,
    } = criterias;
    const filters = {};
    Object.assign(filters, makeUserMongooseFilters(userCriterias));
    Object.assign(filters, makeProgressionMongooseFilters(progressionCriterias));
    Object.assign(filters, makeAssociativeIdMongooseFilters(associativeIdCriterias));
    Object.assign(filters, makeLogLabelMongooseFilters(logLabelCriterias));
    Object.assign(filters, makeCompletionCountMongooseFilters(completionCountCriterias));
    Object.assign(filters, makeCurriculumMongooseFilters(curriculumCriterias));
    Object.assign(filters, makeExperimentMongooseFilters(experimentCriterias));
    return filters;
}

function makeUserMongooseFilters(userCriterias = null) {
    if (!userCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { ids } = userCriterias;
    if (ids && Array.isArray(ids) && ids.length > 0)
        Object.assign(filters, { userId: { $in: ids } });

    return filters;
}

function makeProgressionMongooseFilters(progressionCriterias = null) {
    if (!progressionCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { ids } = progressionCriterias;
    if (ids && Array.isArray(ids) && ids.length > 0)
        Object.assign(filters, { progressionId: { $in: ids } })

    return filters;
}

function makeAssociativeIdMongooseFilters(associativeIdCriterias = null) {
    if (!associativeIdCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { values } = associativeIdCriterias;
    if (values && Array.isArray(values) && values.length > 0)
        Object.assign(filters, { associativeId: { $in: values } });

    return filters;
}

function makeLogLabelMongooseFilters(logLabelCriterias = null) {
    if (!logLabelCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { values } = logLabelCriterias;
    if (values && Array.isArray(values) && values.length > 0)
        Object.assign(filters, { logLabel: { $in: values } });


    return filters;
}

function makeCompletionCountMongooseFilters(completionCountCriterias = null) {
    if (!completionCountCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { values } = completionCountCriterias;
    if (values && Array.isArray(values) && values.length > 0)
        Object.assign(filters, { completionCount: { $in: values } });

    return filters;
}

function makeExperimentMongooseFilters(experimentCriterias = null) {
    if (!experimentCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { ids } = experimentCriterias;
    if (ids && Array.isArray(ids) && ids.length > 0)
        Object.assign(filters, { experimentId: { $in: ids } })

    return filters;
}