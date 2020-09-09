import { userService } from '@/_services';

export default {
    fetchAllUsersHeaders({ commit, dispatch }) {
        commit('indicateFetchingUserList');
        userService.getListAllHeaders()
            .then(
                usersHeadersList => { commit('setHeadersList', usersHeadersList) },
                error => { dispatch('alert/setErrorAlert', error.message, { root: true }) }
            )
            .finally(() => { commit('indicateFetchingUserListEnd'); });
    },

    // // TODO: From here onward, the functions were not yet adapted
    // setEditorExperiment({ commit, dispatch }, id) {
    //     experimentService.getDefinition(id).then(
    //         (description) => {
    //             commit('setEditedExperiment', description);
    //             commit('setSelectedExperiment', description);
    //         },
    //         error => {
    //             dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
    //         })
    // },

    setSelectedUser({ commit, dispatch }, id) {
        userService.getById(id).then(
            user => {
                commit('setSelectedUser', user);
            },
            error => {
                dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
            })
    },

    // startExperimentQuick({ commit, dispatch }, id) {
    //     experimentService.getDefinition(id).then(
    //         (description) => {
    //             commit('setEditedExperiment', description);
    //             commit('setSelectedExperiment', description);
    //             dispatch('experiment/setExperiment', description, { root: true });
    //             dispatch('experiment/setStartingPoint', null, { root: true });
    //             dispatch('experiment/initExperiment', null, { root: true });
    //         },
    //         error => {
    //             dispatch('alert/setErrorAlert', `Failed to start the experiment: ${error.message}`, { root: true });
    //         })
    // },

    // copySelectionToEdition({ commit, getters }) {
    //     commit('setEditedExperiment', getters.experimentSelected);
    // },

    // unsetSelectionExperiment({ commit }) {
    //     commit('unsetSelectedExperiment');
    // },

    // compileExperiment({ commit, dispatch }, experiment) {
    //     experimentService.validateExperiment(experiment).then(
    //         () => {
    //             commit('setEditedExperiment', experiment);
    //             dispatch('alert/setInformationAlert', "The experiment was compiled", { root: true });
    //         },
    //         error => {
    //             dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
    //         })
    // },

    // // This action is the same as as compileExperiment, exception that on an errror, the alert is softer
    // attemptExperimentCompilation({ commit, dispatch }, experiment) {
    //     experimentService.validateExperiment(experiment).then(
    //         () => {
    //             commit('setEditedExperiment', experiment);
    //             dispatch('alert/setInformationAlert', "The experiment is valid and was compiled", { root: true });
    //         },
    //         error => {
    //             dispatch('alert/setWarningAlert', `The experiment could not be compiled : ${error.message}`, { root: true });
    //         })
    // },

    // createExperiment({ commit, dispatch }, experiment) {
    //     commit('indicateCreateRequest');
    //     experimentService.create(experiment)
    //         .then(
    //             experiment => {
    //                 commit('setEditedExperiment', experiment);
    //                 commit('setSelectedExperiment', experiment);
    //                 dispatch('alert/setSuccessAlert', "Experiment creation sucessful", { root: true });
    //                 dispatch('fetchAllExperimentsHeaders');
    //             },
    //             error => {
    //                 dispatch('alert/setErrorAlert', error.message, { root: true });
    //             }
    //         )
    //         .finally(() => {
    //             commit('indicateCreateRequestEnd');
    //         });
    // },

    // updateExperiment({ commit, dispatch }, { id, experiment }) {
    //     commit('indicateUpdateRequest');
    //     experimentService.update(id, experiment)
    //         .then(
    //             experiment => {
    //                 commit('setEditedExperiment', experiment);
    //                 commit('setSelectedExperiment', experiment);
    //                 dispatch('alert/setSuccessAlert', "Experiment update sucessful", { root: true });
    //                 dispatch('fetchAllExperimentsHeaders');
    //             },
    //             error => {
    //                 dispatch('alert/setErrorAlert', error.message, { root: true });
    //             }
    //         )
    //         .finally(() => {
    //             commit('indicateUpdateRequestEnd');
    //         });
    // },

    // deleteExperiment({ commit, dispatch }, id) {
    //     commit('indicateDeleteRequest');
    //     experimentService.delete(id)
    //         .then(
    //             () => {
    //                 commit('unsetSelectedExperiment');
    //                 dispatch('alert/setSuccessAlert', "Experiment deletion sucessful", { root: true });
    //                 dispatch('fetchAllExperimentsHeaders');
    //             },
    //             error => {
    //                 dispatch('alert/setErrorAlert', error.message, { root: true });
    //             }
    //         )
    //         .finally(() => {
    //             commit('indicateDeleteRequestEnd');
    //         });
    // }
}
