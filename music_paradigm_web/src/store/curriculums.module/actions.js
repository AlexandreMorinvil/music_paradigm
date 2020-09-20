import { userService } from '@/_services';

export default {
    fetchAllCurriculumHeaders({ commit, dispatch }) {
        commit('indicateFetchingCurriculumList');
        return curriculumService.getListAllHeaders()
            .then(
                curriculumsHeadersList => { commit('setHeadersList', curriculumsHeadersList) },
                error => { dispatch('alert/setErrorAlert', error.message, { root: true }) }
            )
            .finally(() => { commit('indicateFetchingCurriculumListEnd'); });
    },

    // setSelectedUser({ commit, dispatch }, id) {
    //     return userService.getById(id).then(
    //         user => {
    //             commit('setSelectedUser', user);
    //         },
    //         error => {
    //             dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
    //         })
    // },

    // unsetSelectedUser({ commit }) {
    //     commit('unsetSelectedUser');
    // },

    createCurriculum({ commit, dispatch }, curriculum) {
        commit('indicateCreateRequest');
        return curriculumService.create(curriculum)
            .then(
                createdCurriculum => {
                    commit('setSelectedCurriculum', createdCurriculum);
                    dispatch('alert/setSuccessAlert', "Curriculum creation sucessful", { root: true });
                    dispatch('fetchAllCurriculumHeaders');
                },
                error => {
                    dispatch('alert/setErrorAlert', error.message, { root: true });
                }
            )
            .finally(() => {
                commit('indicateCreateRequestEnd');
            });
    },

    // updateUser({ commit, dispatch }, { id, user }) {
    //     commit('indicateUpdateRequest');
    //     return userService.update(id, user)
    //         .then(
    //             updatedUser => {
    //                 commit('setSelectedUser', updatedUser);
    //                 dispatch('alert/setSuccessAlert', "User update sucessful", { root: true });
    //                 dispatch('fetchAllUsersHeaders');
    //             },
    //             error => {
    //                 dispatch('alert/setErrorAlert', error.message, { root: true });
    //             }
    //         )
    //         .finally(() => {
    //             commit('indicateUpdateRequestEnd');
    //         });
    // },

    // deleteUser({ commit, dispatch }, id) {
    //     commit('indicateDeleteRequest');
    //     return userService.delete(id)
    //         .then(
    //             () => {
    //                 commit('unsetSelectedUser');
    //                 dispatch('alert/setSuccessAlert', "User deletion sucessful", { root: true });
    //                 dispatch('fetchAllUsersHeaders');
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
