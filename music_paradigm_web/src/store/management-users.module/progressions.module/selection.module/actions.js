export default {
	setUserProgressionSelection({ commit }, progression) {
		commit('setUserProgressionSelection', progression);
	},

	unsetUserProgressionSelection({ commit }) {
		commit('unsetUserProgressionSelection');
	},
};
