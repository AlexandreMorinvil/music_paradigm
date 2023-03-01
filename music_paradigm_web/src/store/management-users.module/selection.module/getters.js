export default {
	hasSelectedUser: (_, getters) => {
		return Boolean(getters.userSelectionId);
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

	userSelectionUser: (state) => {
		return state.selectionUser;
	},

	userSelectionUsername: (state) => {
		return state.selectionUser.username;
	},
};
