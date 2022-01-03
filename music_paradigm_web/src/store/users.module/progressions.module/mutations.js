import { defaultState } from '@/store-helper/users.module-helper/progressions.module-helper';

export default {
	// Status Updates
	indicateUpdateParametersRequest(state) {
		state.status.isUpdatingParameters = true;
	},

	indicateUpdateParametersRequestEnd(state) {
		state.status.isUpdatingParameters = false;
	},

	indicateUpdateAdjustmentsRequest(state) {
		state.status.isUpdatingAdjustments = true;
	},

	indicateUpdateAdjustmentsRequestEnd(state) {
		state.status.isUpdatingAdjustments = false;
	},

	indicateExperimentMarkerChangeRequest(state) {
		state.status.isChangingExperimentMarker = true;
	},

	indicateExperimentMarkerChangeRequestEnd(state) {
		state.status.isChangingExperimentMarker = false;
	},

	// Setters
	setSelectedUserProgression(state, userProgression) {
		state.selectedUserProgression = userProgression;
	},

	setSelectedUserProgressionSummary(state, progressionSummary) {
		const { dueExperiment, history, markers } = progressionSummary;
		state.selectedUserExperimentMarkers = markers;
		state.selectedUserProgressionHistory = history;
		state.selectedUserProgressionDueExperiment = dueExperiment;
	},

	unsetSelectedUserProgression(state) {
		state.selectedUserProgression = defaultState.EMPTY_SELECTED_USER_PROGRESSION();
		state.selectedUserExperimentMarkers = defaultState.EMPTY_SELECTED_USER_EXPERIMENT_MARKERS();
		state.selectedUserProgressionHistory = defaultState.EMPTY_SELECTED_USER_PROGRESSION_HISTORY();
		state.selectedUserProgressionDueExperiment = defaultState.EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT();
	},

	setSummariesList(state, usersSummaryList) {
		state.usersSummaryList = usersSummaryList;
	},
};
