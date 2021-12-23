export default {
	userSelectedId: (state) => {
		return state.selectedUser._id;
	},

	userSelectedUsername: (state) => {
		return state.selectedUser.username;
	},

	userSelectedEmail: (state) => {
		return state.selectedUser.email;
	},

	userSelectedFirstName: (state) => {
		return state.selectedUser.firstName;
	},

	userSelectedMiddleName: (state) => {
		return state.selectedUser.middleName;
	},

	userSelectedLastName: (state) => {
		return state.selectedUser.lastName;
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

	userSelectedImposedParameters: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.assignedParameters : {};
	},

	userSelectedProgressionHistory: (state) => {
		return state.selectedUserProgressionHistory;
	},

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
