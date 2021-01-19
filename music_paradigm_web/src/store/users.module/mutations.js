import constants from './constants';

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

	// Setters
	setSelectedUser(state, user) {
		state.selectedUser = constants.EMPTY_USER();
		Object.assign(state.selectedUser, user);
	},

	setSelectedProgression(state, userProgression) {
		state.selectedUserProgression = {};
		Object.assign(state.selectedUserProgression, userProgression);
	},

	unsetSelectedUser(state) {
		state.selectedUser = constants.EMPTY_USER();
		state.selectedUserProgression = {};
	},

	setHeadersList(state, usersHeadersLst) {
		state.usersHeadersList = usersHeadersLst;
	},
};
