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
        datesCriterias,
    } = criterias;

    const filters = {};
    Object.assign(filters, makeUserMongooseFilters(userCriterias));
    Object.assign(filters, makeProgressionMongooseFilters(progressionCriterias));
    Object.assign(filters, makeAssociativeIdMongooseFilters(associativeIdCriterias));
    Object.assign(filters, makeLogLabelMongooseFilters(logLabelCriterias));
    Object.assign(filters, makeCurriculumMongooseFilters(curriculumCriterias));
    Object.assign(filters, makeExperimentMongooseFilters(experimentCriterias));
    Object.assign(filters, makeCompletionCountMongooseFilters(completionCountCriterias));
    Object.assign(filters, makeDatesMongooseFilters(datesCriterias));
    
    return filters;
}

function makeUserMongooseFilters(userCriterias = null) {
    if (!userCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { ids } = userCriterias;
    if (Array.isArray(ids) && ids.length > 0)
        Object.assign(filters, { userId: { $in: ids } });

    return filters;
}

function makeProgressionMongooseFilters(progressionCriterias = null) {
    if (!progressionCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { ids } = progressionCriterias;
    if (Array.isArray(ids) && ids.length > 0)
        Object.assign(filters, { progressionId: { $in: ids } })

    return filters;
}

function makeAssociativeIdMongooseFilters(associativeIdCriterias = null) {
    if (!associativeIdCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { values } = associativeIdCriterias;
    if (Array.isArray(values) && values.length > 0)
        Object.assign(filters, { associativeId: { $in: values } });

    return filters;
}

function makeLogLabelMongooseFilters(logLabelCriterias = null) {
    if (!logLabelCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { values } = logLabelCriterias;
    if (Array.isArray(values) && values.length > 0)
        Object.assign(filters, { logLabel: { $in: values } });


    return filters;
}

function makeCurriculumMongooseFilters(curriculumCriterias = null) {
    if (!curriculumCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { ids } = curriculumCriterias;
    if (Array.isArray(ids) && ids.length > 0)
    Object.assign(filters, { completionCount: { $in: ids } });
    
    return filters;
}

function makeExperimentMongooseFilters(experimentCriterias = null) {
    if (!experimentCriterias) return {};
    const filters = {};
    
    // Parse the criterias
    const { ids } = experimentCriterias;
    if (Array.isArray(ids) && ids.length > 0)
    Object.assign(filters, { experimentId: { $in: ids } })
    
    return filters;
}

function makeCompletionCountMongooseFilters(completionCountCriterias = null) {
    if (!completionCountCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { min, max } = completionCountCriterias;
    if (typeof min === 'number')
        Object.assign(filters, { completionCount: { $gte: min } })

    if (typeof max === 'number')
        Object.assign(filters, { completionCount: { $lte: min } })

    return filters;
}

function makeDatesMongooseFilters(datesCriterias = null) {
    if (!datesCriterias) return {};
    const filters = {};

    // Parse the criterias
    const { maxDate, minDate } = datesCriterias;
    if (maxDate)
        Object.assign(filters, { $or: [{ createdAt: { $lte: Date(maxDate) } }, { updatedAt: { $lte: Date(maxDate) } }] })

    if (minDate)
        Object.assign(filters, { $or: [{ createdAt: { $gte: Date(minDate) } }, { updatedAt: { $gte: Date(minDate) } }] })

    return filters;
}