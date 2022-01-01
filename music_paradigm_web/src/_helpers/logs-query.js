// Exports
export default {
	makeLogQueryCriteriaList,
};


function makeLogQueryCriteriaList(rules) {
	const {
		userIdList,
		progressionIdList,
		associativeIdList,
		logLabelList,
		curriculumIdList,
		experimentIdList,
		minCompletionCount,
		maxCompletionCount,
		minDate,
		maxDate,
	} = rules;

	const logCriterias = {};
	Object.assign(logCriterias, makeUserCriterias(userIdList));
	Object.assign(logCriterias, makeProgressionCriterias(progressionIdList));
	Object.assign(logCriterias, makeAssociativeIdCriterias(associativeIdList));
	Object.assign(logCriterias, makeLogLabelCriterias(logLabelList));
	Object.assign(logCriterias, makeCurriculumCriterias(curriculumIdList));
	Object.assign(logCriterias, makeExperimentCriterias(experimentIdList));
	Object.assign(logCriterias, makeCompletionCountCriterias(minCompletionCount, maxCompletionCount));
	Object.assign(logCriterias, makeDatesMongooseFilters(minDate, maxDate));

	return logCriterias;
}

function makeUserCriterias(userIdList = null) {
	if (!userIdList) return {};
	const criterias = {};

	// Assign the criterias
	if (Array.isArray(userIdList))
		Object.assign(criterias, { ids: userIdList });

	return criterias;
}

function makeProgressionCriterias(progressionIdList = null) {
	if (!progressionIdList) return {};
	const criterias = {};

	// Assign the criterias
	if (Array.isArray(progressionIdList))
		Object.assign(criterias, { ids: progressionIdList });

	return criterias;
}

function makeAssociativeIdCriterias(associativeIdList = null) {
	if (!associativeIdList) return {};
	const criterias = {};

	// Assign the criterias
	if (Array.isArray(associativeIdList))
		Object.assign(criterias, { values: associativeIdList });

	return criterias;
}

function makeLogLabelCriterias(logLabelList = null) {
	if (!logLabelList) return {};
	const criterias = {};

	// Assign the criterias
	if (Array.isArray(logLabelList))
		Object.assign(criterias, { values: logLabelList });

	return criterias;
}

function makeCompletionCountCriterias(minCompletionCount = null, maxCompletionCount = null) {
	if (!minCompletionCount && !maxCompletionCount) return {};
	const criterias = {};

	// Assign the criterias
	if (typeof minCompletionCount === 'number')
		Object.assign(criterias, { min: minCompletionCount });

	if (typeof maxCompletionCount === 'number')
		Object.assign(criterias, { max: maxCompletionCount });

	return criterias;
}

function makeCurriculumCriterias(curriculumIdList = null) {
	if (!curriculumIdList) return {};
	const criterias = {};

	// Assign the criterias
	if (Array.isArray(curriculumIdList))
		Object.assign(criterias, { ids: curriculumIdList });

	return criterias;
}

function makeExperimentCriterias(experimentIdList = null) {
	if (!experimentIdList) return {};
	const criterias = {};

	// Parse the criterias
	if (Array.isArray(experimentIdList))
		Object.assign(criterias, { ids: experimentIdList });

	return criterias;
}

function makeDatesMongooseFilters(minDate = null, maxDate = null) {
	if (!minDate && !maxDate) return {};
	const criterias = {};

	// Assign the criterias
	if (minDate)
		Object.assign(criterias, { min: new Date(minDate) });

	if (maxDate)
		Object.assign(criterias, { max: new Date(maxDate) });

	return criterias;
}
