const mongoose = require("mongoose");

// Exports
module.exports = {
    makeMongooseTaskDataQuery,
};

function makeMongooseTaskDataQuery(criteria) {
    const {
        userCriteria,
        progressionCriteria,
        associativeIdCriteria,
        logLabelCriteria,
        completionCountCriteria,
        curriculumCriteria,
        experimentCriteria,
        datesCriteria,
        specificChoiceCriteria,
    } = criteria;

    const filters = {};
    Object.assign(filters, makeUserMongooseFilters(userCriteria));
    Object.assign(filters, makeProgressionMongooseFilters(progressionCriteria));
    Object.assign(filters, makeAssociativeIdMongooseFilters(associativeIdCriteria));
    Object.assign(filters, makeLogLabelMongooseFilters(logLabelCriteria));
    Object.assign(filters, makeCurriculumMongooseFilters(curriculumCriteria));
    Object.assign(filters, makeExperimentMongooseFilters(experimentCriteria));
    Object.assign(filters, makeCompletionCountMongooseFilters(completionCountCriteria));
    Object.assign(filters, makeDatesMongooseFilters(datesCriteria));
    Object.assign(filters, makeLogsSpecificChoiceMongooseFilters(specificChoiceCriteria));

    return filters;
}

function makeUserMongooseFilters(userCriteria = null) {
    if (!userCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { ids } = userCriteria;
    if (Array.isArray(ids) && ids.length > 0) {
        const castedIds = ids.map((id) => { return mongoose.Types.ObjectId(id) });
        Object.assign(filters, { userId: { $in: castedIds } });
    }

    return filters;
}

function makeProgressionMongooseFilters(progressionCriteria = null) {
    if (!progressionCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { ids } = progressionCriteria;
    if (Array.isArray(ids) && ids.length > 0) {
        const castedIds = ids.map((id) => { return mongoose.Types.ObjectId(id) });
        Object.assign(filters, { progressionId: { $in: castedIds } })
    }

    return filters;
}

function makeAssociativeIdMongooseFilters(associativeIdCriteria = null) {
    if (!associativeIdCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { values } = associativeIdCriteria;
    if (Array.isArray(values) && values.length > 0)
        Object.assign(filters, { associativeId: { $in: values } });

    return filters;
}

function makeLogLabelMongooseFilters(logLabelCriteria = null) {
    if (!logLabelCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { values } = logLabelCriteria;
    if (Array.isArray(values) && values.length > 0)
        Object.assign(filters, { logLabel: { $in: values } });

    return filters;
}

function makeCurriculumMongooseFilters(curriculumCriteria = null) {
    if (!curriculumCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { ids } = curriculumCriteria;
    if (Array.isArray(ids) && ids.length > 0) {
        const castedIds = ids.map((id) => { return mongoose.Types.ObjectId(id) });
        Object.assign(filters, { curriculumId: { $in: castedIds } });
    }

    return filters;
}

function makeExperimentMongooseFilters(experimentCriteria = null) {
    if (!experimentCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { ids } = experimentCriteria;
    if (Array.isArray(ids) && ids.length > 0) {
        const castedIds = ids.map((id) => { return mongoose.Types.ObjectId(id) });
        Object.assign(filters, { experimentId: { $in: castedIds } })
    }

    return filters;
}

function makeCompletionCountMongooseFilters(completionCountCriteria = null) {
    if (!completionCountCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { min, max, values } = completionCountCriteria;
    if (Array.isArray(values) && values.length > 0) {
        Object.assign(filters, { completionCount: { $in: values } });
    }
    else {
        if (typeof min === 'number')
            Object.assign(filters, { completionCount: { $gte: min } })

        if (typeof max === 'number')
            Object.assign(filters, { completionCount: { $lte: min } })
    }

    return filters;
}

function makeDatesMongooseFilters(datesCriteria = null) {
    if (!datesCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { maxDate, minDate } = datesCriteria;
    if (maxDate)
        Object.assign(filters, { $or: [{ createdAt: { $lte: Date(maxDate) } }, { updatedAt: { $lte: Date(maxDate) } }] })

    if (minDate)
        Object.assign(filters, { $or: [{ createdAt: { $gte: Date(minDate) } }, { updatedAt: { $gte: Date(minDate) } }] })

    return filters;
}

function makeLogsSpecificChoiceMongooseFilters(specificChoiceCriteria = null) {
    if (!specificChoiceCriteria) return {};
    const filters = {};

    // Parse the criteria
    const { ids, excludedIds } = specificChoiceCriteria;
    if (Array.isArray(ids) && ids.length > 0) {
        const castedIds = ids.map((id) => { return mongoose.Types.ObjectId(id) });
        Object.assign(filters, { _id: { $in: castedIds } });
    }

    if (Array.isArray(excludedIds) && excludedIds.length > 0) {
        const castedIds = excludedIds.map((id) => { return mongoose.Types.ObjectId(id) });
        Object.assign(filters, { _id: { $nin: castedIds } });
    }

    return filters;
}