export default {
	hasUsersListTableSelection: (_, getters) => {
		return getters.usersListTableSelection.hasElements;
	},

	usersListTableSelection: (state) => {
		return state.usersListTableSelection;
	},

	usersListTableSelectionCount: (state) => {
		return state.usersListTableSelection.elementsCount;
	},

	usersListTableSelectionIdsList: (_, getters) => {
		return getters.usersListTableSelection.idsList;
	},

	usersListTableSelectionAllTagsList: (_, getters) => {
		const userSummariesList = getters.usersListTableSelectionSummariesList;
		const allTagsList = userSummariesList.reduce((tagsList, userSummary) => {
			return tagsList.concat(userSummary.tags);
		}, []);
		return [...new Set(allTagsList)].sort();
	},

	usersListTableSelectionSummariesList: (_, getters, __, rootGetters) => {
		const userIdsList = getters.usersListTableSelectionIdsList;
		const userSummariesListManager = rootGetters['managementUsers/userSummariesListManager'];
		return userSummariesListManager.getUserSummariesByIdsList(userIdsList);
	},

	usersListTableSelectionUsernamesList: (_, getters) => {
		const userSummariesList = getters.usersListTableSelectionSummariesList;
		return userSummariesList.map((userSummary) => userSummary.username);
	},
};
