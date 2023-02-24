export default {
	addUserEditionTag(state) {
		state.editionUser.tags.push("");
	},
	
	deleteUserEditionTag(state, index) {
		state.editionUser.tags.splice(index, 1);
	},

	editUserEditionNote(state, note) {
		state.editionUser.note = note;
	},

	editUserEditionIsPasswordSecret(state, isPasswordSecret) {
		state.editionUser.isPasswordSecret = isPasswordSecret;
	},

	editUserEditionPassword(state, password) {
		state.editionUser.password = password;
	},

	editUserEditionTag(state, {tag, index}) {
		state.editionUser.tags[index] = tag;
	},

	editUserEditionUsername(state, username) {
		state.editionUser.username = username;
	},
};
