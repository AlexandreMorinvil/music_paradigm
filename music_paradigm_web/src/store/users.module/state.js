import { defaultState } from '@/store-helper/users.module-helper';

export default {
	status: {
		isFetchingUsersSummaryList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		isAssigningCurriculum: false,
	},

	// Selected user information
	selectedUser: defaultState.EMPTY_USER(),

	// Users list
	usersSummaryList: defaultState.EMPTY_USERS_HEADERS_LIST(),
};
