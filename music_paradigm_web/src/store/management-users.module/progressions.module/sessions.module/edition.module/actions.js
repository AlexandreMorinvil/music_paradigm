export default {
    setProgressionSessionEdition({ commit }, session) {
		commit('setProgressionSessionEdition', session);
    },

    unsetProgressionSessionEdition({ commit }) {
		commit('setProgressionSessionEdition');
    },
};
