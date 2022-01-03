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

	// Setters
	setSelectedUser(state, user) {
		state.selectedUser = user;
	},

	unsetSelectedUser(state) {
		state.selectedUser = defaultState.EMPTY_USER();
	},

	setSummariesList(state, usersSummaryList) {
		state.usersSummaryList = usersSummaryList;
	},
};
