import { experimentService } from '@/_services';

export default {
    fetchAllExperimentsHeaders({ commit, dispatch }) {
        commit('indicateFetchingExperimentList');
        experimentService.getListAllHeaders()
            .then(
                experimentHeadersList => { commit('setHeadersList', experimentHeadersList) },
                error => { dispatch('alert/setErrorAlert', error.message, { root: true }) }
            )
            .finally(() => {
                commit('indicateFetchingExperimentListEnd');
            });
    },

    setEditorExperiment({ commit, dispatch }, id) {
        experimentService.getDefinition(id).then(
            (description) => {
                commit('setEditedExperiment', description);
                commit('setSelectedExperiment', description);
            },
            error => {
                dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
            })
    },

    setSelectionExperiment({ commit, dispatch }, id) {
        experimentService.getDefinition(id).then(
            (description) => {
                commit('setSelectedExperiment', description);
            },
            error => {
                dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
            })
    },

    startExperimentQuick({ commit, dispatch }, id) {
        experimentService.getDefinition(id).then(
            (description) => {
                commit('setEditedExperiment', description);
                commit('setSelectedExperiment', description);
                dispatch('experiment/setExperiment', description, { root: true });
                dispatch('experiment/setStartingPoint', null, { root: true });
                dispatch('experiment/initExperiment', null, { root: true });
            },
            error => {
                dispatch('alert/setErrorAlert', `Failed to start the experiment: ${error.message}`, { root: true });
            })
    },

    copySelectionToEdition({ commit, getters }) {
        commit('setEditedExperiment', getters.experimentSelected);
    },


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

    createExperiment({ commit, dispatch }, experiment) {
        commit('indicateCreateRequest');
        experimentService.create(experiment)
            .then(
                experiment => {
                    commit('setEditedExperiment', experiment);
                    commit('setSelectedExperiment', experiment);
                    dispatch('alert/setSuccessAlert', "Experiment creation sucessful", { root: true });
                    dispatch('fetchAllExperimentsHeaders');
                },
                error => {
                    dispatch('alert/setSuccessAlert', error.message, { root: true });
                }
            )
            .finally(() => {
                commit('indicateCreateRequestEnd');
            });
    },
}
