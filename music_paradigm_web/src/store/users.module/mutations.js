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

	// Setters
	setSelectedUser(state, user) {
		state.selection = {};
		Object.assign(state.selection, user);
	},

	unsetSelectedUser(state) {
		state.selection = {};
	},

	setHeadersList(state, usersHeadersLst) {
		state.usersHeadersList = usersHeadersLst;
	},
};
