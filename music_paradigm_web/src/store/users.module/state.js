import { defaultState } from '@/store-helper/users.module-helper';

export default {
	status: {
		isFetchingUsersHeadersList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		isAssigningCurriculum: false,
		isResetingProgression: false,
	},

	selectedUser: defaultState.EMPTY_USER(),

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
