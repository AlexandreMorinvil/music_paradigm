export default {

	userEditionGroup: (state) => {
		return state.editionUser.group;
	},

	userEditionIsPasswordSecret: (state) => {
		return state.editionUser.isPasswordSecret;
	},

	userEditionNote: (state) => {
		return state.editionUser.note;
	},

	userEditionPassword: (state) => {
		return state.editionUser.password;
	},

	userEditionTag: (state) => (index) => {
		return state.editionUser.tags[index];
	},

	userEditionTags: (state) => {
		return state.editionUser.tags;
	},

	userEditionUser: (state) => {
		return state.editionUser;
	},

	userEditionUsername: (state) => {
		return state.editionUser.username;
	},
};
