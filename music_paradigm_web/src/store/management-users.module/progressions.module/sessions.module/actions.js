export default {
    setProgressionSessionsStatus({ commit, dispatch }, progressionSessionsStatus) {
		commit('setProgressionSessionsStatus', progressionSessionsStatus);
		dispatch('unsetSelectedProgressionSession');
    },

    setSelectedProgressionSession({ dispatch }, session) {
		dispatch('selection/setProgressionSessionSelection', session);
		dispatch('edition/setProgressionSessionEdition', session);
    },

    unsetSelectedProgressionSession({ dispatch }) {
		dispatch('selection/unsetProgressionSessionSelection');
		dispatch('edition/unsetProgressionSessionEdition');
    }
};
