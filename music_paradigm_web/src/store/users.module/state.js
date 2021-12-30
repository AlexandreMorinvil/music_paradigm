import { defaultState } from '@/store-helper/users.module-helper';

export default {
	status: {
		isFetchingUsersSummaryList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		isAssigningCurriculum: false,
		isUpdatingParameters: false,
		isUpdatingAdjustments: false,
		isResetingProgression: false,
		isChangingExperimentMarker: false,
	},

	// Selected user information
	selectedUser: defaultState.EMPTY_USER(),
	selectedUserProgression: defaultState.EMPTY_SELECTED_USER_PROGRESSION(),
	selectedUserExperimentMarkers: defaultState.EMPTY_SELECTED_USER_EXPERIMENT_MARKERS(),
	selectedUserProgressionHistory: defaultState.EMPTY_SELECTED_USER_PROGRESSION_HISTORY(),
	selectedUserProgressionDueExperiment: defaultState.EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT(),

	// Users list
	usersSummaryList: defaultState.EMPTY_USERS_HEADERS_LIST(),
};
