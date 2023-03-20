export default {
	setProgressionSessionSelection({ commit }, session) {
		commit('setProgressionSessionSelection', session);
	},

	unsetProgressionSessionSelection({ commit }) {
		commit('unsetProgressionSessionSelection');
	},
};