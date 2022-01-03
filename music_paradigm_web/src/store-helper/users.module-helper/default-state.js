export default {
	EMPTY_USER,
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
