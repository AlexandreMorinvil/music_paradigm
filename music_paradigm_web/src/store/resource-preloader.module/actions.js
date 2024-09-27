export default {
	initializePreloading({ commit }, { flow, flowPrelude, index, folder }) {
		commit('initializePreloading', { flow, flowPrelude, index, folder });
	},

    updatePreloader({ commit }, { flow, index, isMainFlow }) {
        commit('updatePreloader', { flow, index, isMainFlow });
    },

    setBaseUrl({ commit }, baseUrl) {
        commit('setBaseUrl', baseUrl);
    },

    reset({ commit }) {
        commit('reset');
    },
};
