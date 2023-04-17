import _isEqual from 'lodash/isEqual';

export default {
	fetchingAndSelectingUserId: (state) => {
		return state.status.fetchingAndSelectingUserId;
	},

	hasSelectedUser: (state) => {
		return Boolean(state.selectedUser._id);
	},

	hasCurriculumToSelectedUser: (state) => {
		return Boolean(state.selectedUser.curriculum);
	},

	hasEditedUser: (_, getters) => {
		return !_isEqual(
			getters['selection/userSelection'],
			getters['edition/userEdition'],
		);
	},

	hasEditedUserUsername: (_, getters) => {
		return getters['selection/userSelectionUsername'] !==
			getters['edition/userEditionUsername'];
	},

	isCreatingUser: (state) => {
		return state.status.isCreatingUser;
	},

	isCreatingUserWithCurriculum: (state) => {
		return state.status.isCreatingUserWithCurriculum;
	},

	isDeletingUser: (state) => {
		return state.status.isDeletingUser;
	},

	isFetchingUser: (state) => {
		return state.status.isFetchingUser;
	},

	isExecutingUserCommand: (_, getters) => {
		return getters['progressions/isExecutingUserProgressionCommand'] ||
			!!getters.fetchingAndSelectingUserId ||
			getters.isCreatingUser ||
			getters.isCreatingUserWithCurriculum ||
			getters.isDeletingUser ||
			getters.isFetchingUser ||
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

	userSummariesList: (state) => {
		return state.userSummariesListManager.userSummariesList;
	},

	usersExistingUserGroupsList: (state) => {
		return state.existingUserGroupsList;
	},
};
