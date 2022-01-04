export default {
	EMPTY_SELECTED_USER_PROGRESSION,
	EMPTY_SELECTED_USER_EXPERIMENT_MARKERS,
	EMPTY_SELECTED_USER_PROGRESSION_HISTORY,
	EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT,
};

function EMPTY_SELECTED_USER_PROGRESSION() {
	return {
		userReference: '',
		curriculumReference: '',
		startTime: null,
		lastProgressionDate: null,
		assignedParameters: [],
	};
}

function EMPTY_SELECTED_USER_PROGRESSION_HISTORY() {
	return [];
}

function EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT() {
	return null;
}

function EMPTY_SELECTED_USER_EXPERIMENT_MARKERS() {
	return [];
}
