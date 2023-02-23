export default {
	userEditionIsPasswordSecret: (state) => {
		return state.editionUser.isPasswordSecret;
	},

	userEditionUsername: (state) => {
		return state.editionUser.username;
	},

	userEditionPassword: (state) => {
		return state.editionUser.password;
	}
};
