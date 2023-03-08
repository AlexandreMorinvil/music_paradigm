export default {
	hasSelectedUser: (_, getters) => {
		return Boolean(getters.userSelectionId);
	},

	userSelectionUsername: (state) => {
		return state.selectionUser.username;
	},
};
