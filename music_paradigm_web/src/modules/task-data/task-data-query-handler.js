// Exports
export default {
	makeTaskDataQueryCriteriaList,
};


function makeTaskDataQueryCriteriaList(rules = null) {
	if (!rules) return {};
	const {
		userIdList,
		progressionIdList,
		associativeIdList,
		logLabelList,
		curriculumIdList,
		experimentIdList,
		completionCountList,
		minCompletionCount,
		maxCompletionCount,
		minDate,
		maxDate,
		selectedLogIds,
		excludedLogIds,
	} = rules;

	const taskDataQueryCriteria = {};
	Object.assign(taskDataQueryCriteria, makeUserCriteria(userIdList));
	Object.assign(taskDataQueryCriteria, makeProgressionCriteria(progressionIdList));
	Object.assign(taskDataQueryCriteria, makeAssociativeIdCriteria(associativeIdList));
	Object.assign(taskDataQueryCriteria, makeLogLabelCriteria(logLabelList));
	Object.assign(taskDataQueryCriteria, makeCurriculumCriteria(curriculumIdList));
	Object.assign(taskDataQueryCriteria, makeExperimentCriteria(experimentIdList));
	Object.assign(taskDataQueryCriteria, makeCompletionCountCriteria(completionCountList, minCompletionCount, maxCompletionCount));
	Object.assign(taskDataQueryCriteria, makeDatesCriteria(minDate, maxDate));
	Object.assign(taskDataQueryCriteria, makeLogsSpecificCriteria(selectedLogIds, excludedLogIds));

	return taskDataQueryCriteria;
}

function makeUserCriteria(userIdList = null) {
	if (!userIdList) return {};
	const criteria = {};

	// Assign the criteria
	if (Array.isArray(userIdList))
		Object.assign(criteria, { ids: userIdList });

	return { userCriteria: criteria };
}

function makeProgressionCriteria(progressionIdList = null) {
	if (!progressionIdList) return {};
	const criteria = {};

	// Assign the criteria
	if (Array.isArray(progressionIdList))
		Object.assign(criteria, { ids: progressionIdList });

	return { progressionCriteria: criteria };
}

function makeAssociativeIdCriteria(associativeIdList = null) {
	if (!associativeIdList) return {};
	const criteria = {};

	// Assign the criteria
	if (Array.isArray(associativeIdList))
		Object.assign(criteria, { values: associativeIdList });

	return { associativeIdCriteria: criteria };
}

function makeLogLabelCriteria(logLabelList = null) {
	if (!logLabelList) return {};
	const criteria = {};

	// Assign the criteria
	if (Array.isArray(logLabelList))
		Object.assign(criteria, { values: logLabelList });

	return { logLabelCriteria: criteria };
}

function makeCompletionCountCriteria(completionCountList = null, minCompletionCount = null, maxCompletionCount = null) {
	if (!completionCountList && !minCompletionCount && !maxCompletionCount) return {};
	const criteria = {};

	// Assign the criteria

	if (Array.isArray(completionCountList))
		Object.assign(criteria, { values: completionCountList });

	if (typeof minCompletionCount === 'number')
		Object.assign(criteria, { min: minCompletionCount });

	if (typeof maxCompletionCount === 'number')
		Object.assign(criteria, { max: maxCompletionCount });

	return { completionCountCriteria: criteria };
}

function makeCurriculumCriteria(curriculumIdList = null) {
	if (!curriculumIdList) return {};
	const criteria = {};

	// Assign the criteria
	if (Array.isArray(curriculumIdList))
		Object.assign(criteria, { ids: curriculumIdList });

	return { curriculumCriteria: criteria };
}

function makeExperimentCriteria(experimentIdList = null) {
	if (!experimentIdList) return {};
	const criteria = {};

	// Parse the criteria
	if (Array.isArray(experimentIdList))
		Object.assign(criteria, { ids: experimentIdList });

	return { experimentCriteria: criteria };
}

function makeDatesCriteria(minDate = null, maxDate = null) {
	if (!minDate && !maxDate) return {};
	const criteria = {};

	// Assign the criteria
	if (minDate)
		Object.assign(criteria, { min: new Date(minDate) });

	if (maxDate)
		Object.assign(criteria, { max: new Date(maxDate) });

	return { datesCriteria: criteria };
}

function makeLogsSpecificCriteria(ids = null, excludedIds = null) {
	if (!ids && !excludedIds) return {};
	const criteria = {};

	// Parse the criteria
	if (Array.isArray(ids))
		Object.assign(criteria, { ids: ids });

	if (Array.isArray(excludedIds))
		Object.assign(criteria, { excludedIds: excludedIds });

	return { specificChoiceCriteria: criteria };
}
