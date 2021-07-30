import { defaultState } from '@/store-helper/users.module-helper';

export default {
	status: {
		isFetchingUsersSummaryList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		isAssigningCurriculum: false,
		isUpdatingParameters: false,
		isResetingProgression: false,
	},

	selectedUser: defaultState.EMPTY_USER(),
	selectedUserProgression: defaultState.EMPTY_SELECTED_USER_PROGRESSION(),
	usersSummaryList: defaultState.EMPTY_USERS_HEADERS_LIST(),
};
