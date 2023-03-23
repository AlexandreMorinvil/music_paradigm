export default {
	setUserSelection({ commit }, user) {
		commit('setUserSelection', user);
	},

	unsetUserSelection({ commit }) {
		commit('unsetUserSelection');
	},
};
