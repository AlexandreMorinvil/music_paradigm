import { experimentService } from '@/_services';

export default {
    async setSelectedExperiment({ commit }, experimentReference) {

    },
    setEditedExperiment({ commit, dispatch }, experiment) {
        experimentService.validateExperiment(experiment).then(
            () => {
                commit('setEditedExperiment', experiment);
            },
            error => {
                dispatch('alert/setErrorAlert', error, { root: true });
            })
    }
}
