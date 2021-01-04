export default {
	status: {
		isFetchingUsersHeadersList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
	},

	selection: {
		_id: null,
		// The Rest of the parameters are also included
		username: '',
		email: '',
		role: '',
		tags: [],
		firstName: '',
		middleName: '',
		lastName: '',
		curriculum: null,
	},

	usersHeadersList: [
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
	],
};
