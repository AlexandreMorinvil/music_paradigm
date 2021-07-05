import { defaultState } from '@/store-helper/users.module-helper';

export default {
	status: {
		isFetchingUsersHeadersList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		isAssigningCurriculum: false,
		isUpdatingParameters: false,
		isResetingProgression: false,
	},

	selectedUser: defaultState.EMPTY_USER(),
	selectedUserProgression: defaultState.EMPTY_SELECTED_USER_PROGRESSION(),
	usersHeadersList: defaultState.EMPTY_USERS_HEADERS_LIST(),
};
