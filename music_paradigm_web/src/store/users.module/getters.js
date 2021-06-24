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
		return state.selectedUser.assignedParameters;
	},

	usersHeadersList: (state) => {
		return state.usersHeadersList;
	},

	// Status
	hasSelectedUser: (state) => {
		return Boolean(state.selectedUser._id);
	},

	hasCurriculumToSelectedUser: (state) => {
		return Boolean(state.selectedUser.curriculum);
	},

	isFetchingUserHeadersList: (state) => {
		return state.status.isFetchingUsersHeadersList;
	},
};
