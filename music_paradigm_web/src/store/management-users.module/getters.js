import _isEqual from 'lodash/isEqual';

export default {
	hasSelectedUser: (state) => {
		return Boolean(state.selectedUser._id);
	},

	hasCurriculumToSelectedUser: (state) => {
		return Boolean(state.selectedUser.curriculum);
	},

	hasEditedUser: (_, getters) => {
		return !_isEqual(
			getters['selection/userSelectionUser'],
			getters['edition/userEditionUser'],
		);
	},

	isCreatingUser: (state) => {
		return state.status.isCreatingUser;
	},

	isDeletingUser: (state) => {
		return state.status.isDeletingUser;
	},

	isExecutingUserCommand: (_, getters) => {
		return getters['progressions/isExecutingUserProgressionCommand'] ||
			getters.isCreatingUser ||
			getters.isDeletingUser ||
			getters.isUpdatingUser;
	},

	isFetchingUsersSummaryList: (state) => {
		return state.status.isFetchingUsersSummaryList;
	},

	isUpdatingUser: (state) => {
		return state.status.isUpdatingUser;
	},

	// TODO : Delete this getter when the code will have been adjusted
	userSelectedId: (state) => {
		return state.selectedUser._id;
	},

	// TODO : Delete this getter when the code will have been adjusted
	userSelectedUsername: (state) => {
		return state.selectedUser.username;
	},

	// TODO : Delete this getter when the code will have been adjusted
	userSelectedCurriculum: (state) => {
		return state.selectedUser.curriculum;
	},

	usersSummaryList: (state) => {
		return state.usersSummaryList;
	},

	usersExistingUserGroupsList: (state) => {
		return state.existingUserGroupsList;
	},
};
