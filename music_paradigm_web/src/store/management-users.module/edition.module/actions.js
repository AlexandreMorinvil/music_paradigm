export default {
	editUserEditionIsPasswordSecret({ commit }, isPasswordSecret) {
		commit('editUserEditionIsPasswordSecret', isPasswordSecret);
	},

	editUserEditionPassword({ commit }, password) {
		commit('editUserEditionPassword', password);
	},

	editUserEditionUsername({ commit }, username) {
		commit('editUserEditionUsername', username);
	}
};
