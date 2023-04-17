export default {
	hasShallowSelectedUsers: (_, getters) => {
		return getters.userShallowSelection.hasElement;
	},

	userShallowSelection: (state) => {
		return state.shallowSelectionUsers;
	},

	userShallowSelectionIdsList: (_, getters) => {
		return getters.userShallowSelection.idsList;
	},
};
