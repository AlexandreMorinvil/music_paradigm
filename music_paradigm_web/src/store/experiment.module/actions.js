export default {
    setExperiment: ({ commit }, experiment) => {
        commit('setExperiment', experiment);
    },
    setStartingPoint: ({ commit }, cursor = null) => {
        commit('initCursor', cursor);
    },
    updateState: ({ commit }) => {
        commit('updateState');
    },
    goNextStep: ({ commit }) => {
        commit('moveNextStep');
    }
}
