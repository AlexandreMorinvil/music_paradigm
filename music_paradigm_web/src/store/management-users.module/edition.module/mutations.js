export default {
	editUserEditionIsPasswordSecret(state, isPasswordSecret) {
		state.editionUser.isPasswordSecret = isPasswordSecret;
	},

	editUserEditionPassword(state, password) {
		state.editionUser.password = password;
	},

	editUserEditionUsername(state, username) {
		state.editionUser.username = username;
	},
};
