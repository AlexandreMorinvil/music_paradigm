export default {
	userEdition: (state) => {
		return state.editionUser;
	},

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
		return state.editionUser.exposablePassword;
	},

	userEditionTag: (state) => (index) => {
		return state.editionUser.tags[index];
	},

	userEditionTags: (state) => {
		return state.editionUser.tags;
	},

	userEditionUsername: (state) => {
		return state.editionUser.username;
	},
};
