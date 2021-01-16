export default {
	status: {
		isFetchingUsersHeadersList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		isAssigningCurriculum: false,
	},

	selectedUser: {
		_id: null,

		username: '',
		email: '',
		role: '',
		tags: [],
		firstName: '',
		middleName: '',
		lastName: '',
		curriculum: null,
	},

	selectedUserProgression: {
		userReference: '',
		curriculumReference: '',
		startTime: null,
		lastProgressionDate: null,
		curriculumParameters: [],
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
