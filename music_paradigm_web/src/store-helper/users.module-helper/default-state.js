export default {
	EMPTY_USER,
	EMPTY_SELECTED_USER_PROGRESSION,
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

		assignedParameters: {},
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
