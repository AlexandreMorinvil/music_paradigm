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

	// Selected user information
	selectedUser: defaultState.EMPTY_USER(),
	selectedUserProgression: defaultState.EMPTY_SELECTED_USER_PROGRESSION(),
	selectedUserProgressionHistory: defaultState.EMPTY_SELECTED_USER_PROGRESSION_HISTORY(),
	selectedUserProgressionDueExperiment: defaultState.EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT(),

	// Users list
	usersSummaryList: defaultState.EMPTY_USERS_HEADERS_LIST(),
};
