import { userService } from '@/_services';

export default {
    fetchAllUsersHeaders({ commit, dispatch }) {
        commit('indicateFetchingUserList');
        return userService.getListAllHeaders()
            .then(
                usersHeadersList => { commit('setHeadersList', usersHeadersList) },
                error => { dispatch('alert/setErrorAlert', error.message, { root: true }) }
            )
            .finally(() => { commit('indicateFetchingUserListEnd'); });
    },

    setSelectedUser({ commit, dispatch }, id) {
        return userService.getById(id).then(
            user => {
                commit('setSelectedUser', user);
            },
            error => {
                dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
            })
    },

    unsetSelectedUser({ commit }) {
        commit('unsetSelectedUser');
    },

    createUser({ commit, dispatch }, user) {
        commit('indicateCreateRequest');
        return userService.register(user)
            .then(
                createdUser => {
                    commit('setSelectedUser', createdUser);
                    dispatch('alert/setSuccessAlert', "User creation sucessful", { root: true });
                    dispatch('fetchAllUsersHeaders');
                },
                error => {
                    dispatch('alert/setErrorAlert', error.message, { root: true });
                }
            )
            .finally(() => {
                commit('indicateCreateRequestEnd');
            });
    },

    updateUser({ commit, dispatch }, { id, user }) {
        commit('indicateUpdateRequest');
        return userService.update(id, user)
            .then(
                updatedUser => {
                    commit('setSelectedUser', updatedUser);
                    dispatch('alert/setSuccessAlert', "User update sucessful", { root: true });
                    dispatch('fetchAllUsersHeaders');
                },
                error => {
                    dispatch('alert/setErrorAlert', error.message, { root: true });
                }
            )
            .finally(() => {
                commit('indicateUpdateRequestEnd');
            });
    },

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
