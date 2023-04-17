export default {
	hasSelectedUser: (_, getters) => {
		return Boolean(getters.userSelectionId);
	},

	userSelection: (state) => {
		return state.selectionUser;
	},

	userSelectionCreatedAt: (state) => {
		return state.selectionUser.createdAt;
	},

	userSelectionGroup: (state) => {
		return state.selectionUser.group;
	},

	userSelectionId: (state) => {
		return state.selectionUser._id;
	},

	userSelectionIsPasswordSecret: (state) => {
		return state.selectionUser.isPasswordSecret;
	},

	userSelectionLastLogin: (state) => {
		return state.selectionUser.lastLogin;
	},

	userSelectionNote: (state) => {
		return state.selectionUser.note;
	},

	userSelectionPassword: (state) => {
		return state.selectionUser.password;
	},

	userSelectionTags: (state) => {
		return state.selectionUser.tags;
	},

	userSelectionUpdatedAt: (state) => {
		return state.selectionUser.updatedAt;
	},

	userSelectionUsername: (state) => {
		return state.selectionUser.username;
	},
};
