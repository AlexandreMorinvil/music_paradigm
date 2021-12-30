export default {
	EMPTY_USER,
	EMPTY_SELECTED_USER_PROGRESSION,
	EMPTY_SELECTED_USER_EXPERIMENT_MARKERS,
	EMPTY_SELECTED_USER_PROGRESSION_HISTORY,
	EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT,
	EMPTY_USERS_HEADERS_LIST,
};

function EMPTY_USER() {
	return {
		_id: null,

		username: '',
		email: '',
		role: '',
		tags: [],
		firstName: '',
		middleName: '',
		lastName: '',
		curriculum: null,
	};
}

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

function EMPTY_USERS_HEADERS_LIST() {
	return [
		{
			_id: '',
			username: '',
			email: '',
			role: '',
			tags: [],
			firstName: '',
			middleName: '',
			lastName: '',
			curriculumTitle: '',
		},
	];
}
