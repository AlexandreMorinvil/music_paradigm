import { defaultState } from '@/store-helper/users.module-helper/progressions.module-helper';

export default {
	// Status Updates
	indicateAssigningCurriculum(state) {
		state.status.isAssigningCurriculum = true;
	},

	indicateAssigningCurriculumEnd(state) {
		state.status.isAssigningCurriculum = false;
	},

	indicateAssigningParameters(state) {
		state.status.isAssigningParameters = true;
	},

	indicateAssigningParametersEnd(state) {
		state.status.isAssigningParameters = false;
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

	setSelectedUserProgressionSummary(state, progressionSessionsStatus) {
		const { dueExperiment, history, markers } = progressionSessionsStatus;
		state.selectedUserExperimentMarkers = markers;
		state.selectedUserProgressionHistory = history;
		state.selectedUserProgressionDueExperiment = dueExperiment;
	},

	setSelectedSession(state, session) {
		const { associativeId, associativeIdOrdinalNumber } = session;
		state.selectedSessionAssociativeId = associativeId;
		state.selectedSessionAssociativeIdOrdinalNumber = associativeIdOrdinalNumber;
	},

	setSelectedSessionCompletionCount(state, completionCount) {
		state.selectedCompletionCount = completionCount;
	},

	// Mutations to unset mutations
	unsetSelectedUserProgression(state) {
		state.selectedUserProgression = defaultState.EMPTY_SELECTED_USER_PROGRESSION();
		state.selectedUserExperimentMarkers = defaultState.EMPTY_SELECTED_USER_EXPERIMENT_MARKERS();
		state.selectedUserProgressionHistory = defaultState.EMPTY_SELECTED_USER_PROGRESSION_HISTORY();
		state.selectedUserProgressionDueExperiment = defaultState.EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT();
	},

	unsetSelectedSession(state) {
		state.selectedSessionAssociativeId = null;
		state.selectedSessionAssociativeIdOrdinalNumber = null;
	},

	unsetSelectedSessionCompletionCount(state) {
		state.selectedCompletionCount = null;
	},
};
