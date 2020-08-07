import { experimentService } from '@/_services';

export default {
    setSelectedExperiment({ commit }, experimentReference) {

    },

    setEditedExperiment({ commit, dispatch }, experiment) {
        experimentService.validateExperiment(experiment).then(
            () => {
                commit('setEditedExperiment', experiment);
            },
            error => {
                dispatch('alert/setErrorAlert', error.message, { root: true });
            })
    },

    createExperiment({ dispatch, commit }, experiment) {
        commit('indicateRequest', "creating");
        experimentService.create(experiment)
            .then(
                response => {
                    commit('setEditedExperiment', response.experiment);
                    commit('setSelectedExperiment', response.experiment);
                    dispatch('alert/setSuccessAlert', "Experiment creation sucessful", { root: true });
                },
                error => {
                    dispatch('alert/setErrorAlert', error, { root: true });
                }
            )
            .finally(() => {
                commit('indicateRequestEnd', "creating");
            });
    },
}
