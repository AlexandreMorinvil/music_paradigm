export default {
	hasSelectedUser: (_, getters) => {
		return Boolean(getters.userSelectionId);
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

	userSelectionTag: (state) => (index) => {
		return state.selectionUser.tags[index];
	},

	userSelectionTags: (state) => {
		return state.selectionUser.tags;
	},

	userSelectionUpdatedAt: (state) => {
		return state.selectionUser.updatedAt;
	},

	userSelectionUser: (state) => {
		return state.selectionUser;
	},

	userSelectionUsername: (state) => {
		return state.selectionUser.username;
	},
};
