import { defaultState } from '@/store-helper/users.module-helper/progressions.module-helper';

export default {
	status: {
		isUpdatingParameters: false,
		isUpdatingAdjustments: false,
		isResetingProgression: false,
		isChangingExperimentMarker: false,
	},

	// Selected user information
	selectedUserProgression: defaultState.EMPTY_SELECTED_USER_PROGRESSION(),
	selectedUserExperimentMarkers: defaultState.EMPTY_SELECTED_USER_EXPERIMENT_MARKERS(),
	selectedUserProgressionHistory: defaultState.EMPTY_SELECTED_USER_PROGRESSION_HISTORY(),
	selectedUserProgressionDueExperiment: defaultState.EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT(),

	// Selected session
	selectedSessionAssociativeId: null,
	selectedSessionAssociativeIdOrdinalNumber: null,

	selectedCompletionCount: null,
};
