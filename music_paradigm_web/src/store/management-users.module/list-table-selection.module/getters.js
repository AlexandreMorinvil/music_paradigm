export default {
	hasUsersListTableSelection: (_, getters) => {
		return getters.usersListTableSelection.hasElement;
	},

	usersListTableSelection: (state) => {
		return state.usersListTableSelection;
	},

	usersListTableSelectionIdsList: (_, getters) => {
		return getters.usersListTableSelection.idsList;
	},
};
