export default {
	addUserEditionTag({ commit }) {
		commit('addUserEditionTag');
	},
	
	deleteUserEditionTag({ commit }, index) {
		commit('deleteUserEditionTag', index);
	},

	editUserEditionGroup({ commit }, group) {
		commit('editUserEditionGroup', group);
	},
	
	editUserEditionIsPasswordSecret({ commit }, isPasswordSecret) {
		commit('editUserEditionIsPasswordSecret', isPasswordSecret);
	},

	editUserEditionNote({ commit }, note) {
		commit('editUserEditionNote', note);
	},

	editUserEditionPassword({ commit }, password) {
		commit('editUserEditionPassword', password);
	},

	editUserEditionTag({ commit }, { tag, index }) {
		commit('editUserEditionTag', { tag, index });
	},

	editUserEditionUsername({ commit }, username) {
		commit('editUserEditionUsername', username);
	},
};
