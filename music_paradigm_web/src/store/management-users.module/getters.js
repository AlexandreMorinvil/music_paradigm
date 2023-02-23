export default {
	// User values
	userSelectedId: (state) => {
		return state.selectedUser._id;
	},

	userSelectedUsername: (state) => {
		return state.selectedUser.username;
	},

	userSelectedTags: (state) => {
		return state.selectedUser.tags;
	},

	userSelectedRole: (state) => {
		return state.selectedUser.role;
	},

	userSelectedCurriculum: (state) => {
		return state.selectedUser.curriculum;
	},

	// List of users
	usersSummaryList: (state) => {
		return state.usersSummaryList;
	},

	// Status
	hasSelectedUser: (state) => {
		return Boolean(state.selectedUser._id);
	},

	hasCurriculumToSelectedUser: (state) => {
		return Boolean(state.selectedUser.curriculum);
	},

	isFetchingUsersSummaryList: (state) => {
		return state.status.isFetchingUsersSummaryList;
	},
};
