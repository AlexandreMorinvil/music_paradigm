import { defaultState } from '@/store-helper/users.module-helper';

export default {
	// Status Updates
	indicateFetchingUserList(state) {
		state.status.isFetchingUsersSummaryList = true;
	},

	indicateFetchingUserListEnd(state) {
		state.status.isFetchingUsersSummaryList = false;
	},

	indicateCreateRequest(state) {
		state.status.isCreating = true;
	},

	indicateCreateRequestEnd(state) {
		state.status.isCreating = false;
	},

	indicateUpdateRequest(state) {
		state.status.isUpdating = true;
	},

	indicateUpdateRequestEnd(state) {
		state.status.isUpdating = false;
	},

	indicateDeleteRequest(state) {
		state.status.isDeleting = true;
	},

	indicateDeleteRequestEnd(state) {
		state.status.isDeleting = false;
	},

	indicateAssignCurriculumRequest(state) {
		state.status.isAssigningCurriculum = true;
	},

	indicateAssignCurriculumRequestEnd(state) {
		state.status.isAssigningCurriculum = false;
	},

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

	indicateResetProgressionRequest(state) {
		state.status.isResetingProgression = true;
	},

	indicateResetProgressionRequestEnd(state) {
		state.status.isResetingProgression = false;
	},

	// Setters
	setSelectedUser(state, user) {
		state.selectedUser = user;
	},

	setSelectedUserProgression(state, userProgression) {
		state.selectedUserProgression = userProgression;
	},

	setSelectedUserProgressionSummary(state, progressionSummary) {
		const { dueExperiment, history, markers } = progressionSummary;
		state.selectedUserExperimentMarkers = markers;
		state.selectedUserProgressionHistory = history;
		state.selectedUserProgressionDueExperiment = dueExperiment;
	},

	unsetSelectedUser(state) {
		state.selectedUser = defaultState.EMPTY_USER();
		state.selectedUserProgression = defaultState.EMPTY_SELECTED_USER_PROGRESSION();
		state.selectedUserExperimentMarkers = defaultState.EMPTY_SELECTED_USER_EXPERIMENT_MARKERS();
		state.selectedUserProgressionHistory = defaultState.EMPTY_SELECTED_USER_PROGRESSION_HISTORY();
		state.selectedUserProgressionDueExperiment = defaultState.EMPTY_SELECTED_USER_PROGRESSION_DUE_EXPERIMENT();
	},

	setSummariesList(state, usersSummaryList) {
		state.usersSummaryList = usersSummaryList;
	},
};
