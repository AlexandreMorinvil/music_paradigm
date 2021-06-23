import { defaultState } from '@/store-helper/users.module-helper';

export default {
	// Status Updates
	indicateFetchingUserList(state) {
		state.status.isFetchingUsersHeadersList = true;
	},

	indicateFetchingUserListEnd(state) {
		state.status.isFetchingUsersHeadersList = false;
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

	indicateResetProgressionRequest(state) {
		state.status.isResetingProgression = true;
	},

	indicateResetProgressionRequestEnd(state) {
		state.status.isResetingProgression = false;
	},

	// Setters
	setSelectedUser(state, user) {
		state.selectedUser = defaultState.EMPTY_USER();
		Object.assign(state.selectedUser, user);
	},

	setSelectedProgression(state, userProgression) {
		state.selectedUserProgression = {};
		Object.assign(state.selectedUserProgression, userProgression);
	},

	unsetSelectedUser(state) {
		state.selectedUser = defaultState.EMPTY_USER();
		state.selectedUserProgression = {};
	},

	setHeadersList(state, usersHeadersLst) {
		state.usersHeadersList = usersHeadersLst;
	},
};
