import _isEqual from 'lodash/isEqual';

export default {
	hasSelectedUser: (state) => {
		return Boolean(state.selectedUser._id);
	},

	hasCurriculumToSelectedUser: (state) => {
		return Boolean(state.selectedUser.curriculum);
	},

	hasUserEditionChange: (_, getters) => {
		return !_isEqual(
			getters['selection/userSelectionUser'],
			getters['edition/userEditionUser'],
		);
	},

	isFetchingUsersSummaryList: (state) => {
		return state.status.isFetchingUsersSummaryList;
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
