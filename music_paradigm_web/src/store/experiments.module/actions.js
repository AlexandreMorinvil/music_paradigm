import { experimentService } from '@/_services';

export default {
    // setSelectedExperiment({ commit }, experimentReference) {

    // },

    // copySelectionToEdition({ commit, getters }) {
    //     // commit('setEditedExperiment', getters.experimentSelected);
    //     // commit('indicateHasCompiledEdition');
    // },

    compileExperiment({ commit, dispatch }, experiment) {
        experimentService.validateExperiment(experiment).then(
            () => {
                commit('setEditedExperiment', experiment);
                commit('indicateHasCompiledEdition');
                dispatch('alert/setInformationAlert', "The experiment was compiled", { root: true });
            },
            error => {
                dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
            })
    },

    // This action is the same as as compileExperiment, exception that on an errror, the alert is softer
    attemptExperimentCompilation({ commit, dispatch }, experiment) {
        experimentService.validateExperiment(experiment).then(
            () => {
                commit('setEditedExperiment', experiment);
                commit('indicateHasCompiledEdition');
                dispatch('alert/setInformationAlert', "The experiment is valid and was compiled", { root: true });
            },
            error => {
                dispatch('alert/setWarningAlert', `The experiment could not be compiled : ${error.message}`, { root: true });
            })
    },


    createExperiment({ dispatch, commit }, experiment) {
        commit('indicateCreateRequest');
        experimentService.create(experiment)
            .then(
                response => {
                    commit('setEditedExperiment', response.experiment);
                    commit('setSelectedExperiment', response.experiment);
                    dispatch('alert/setSuccessAlert', "Experiment creation sucessful", { root: true });
                },
                error => {
                    dispatch('alert/setErrorAlert', error.message, { root: true });
                }
            )
            .finally(() => {
                commit('indicateCreateRequestEnd');
            });
    },
}
