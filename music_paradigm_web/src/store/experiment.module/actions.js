export default {
    setExperiment: ({ commit }, experiment) => {
        commit('setExperiment', experiment);
    },
    initExperiment: ({ commit }) => {
        commit('initExperiment');
    },
    initState: ({ commit }) => {
        commit('initState');
    },
    goNextStep: ({ commit }) => {
        commit('goNextStep');
    }
}
