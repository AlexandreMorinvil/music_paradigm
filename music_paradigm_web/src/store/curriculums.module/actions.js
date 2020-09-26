import { curriculumService } from '@/_services';

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

    setSelectedCurriculum({ commit, dispatch }, id) {
        return curriculumService.getById(id).then(
            user => {
                commit('setSelectedCurriculum', user);
            },
            error => {
                dispatch('alert/setErrorAlert', `Curriculum selection failed : ${error.message}`, { root: true });
            })
    },

    unsetSelectedCurriculum({ commit }) {
        commit('unsetSelectedCurriculum');
    },

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

    updateCurriculum({ commit, dispatch }, { id, curriculum }) {
        commit('indicateUpdateRequest');
        return curriculumService.update(id, curriculum)
            .then(
                updatedCurriculum => {
                    commit('setSelectedCurriculum', updatedCurriculum);
                    dispatch('alert/setSuccessAlert', "Curriculum update sucessful", { root: true });
                    dispatch('fetchAllCurriculumHeaders');
                },
                error => {
                    dispatch('alert/setErrorAlert', error.message, { root: true });
                }
            )
            .finally(() => {
                commit('indicateUpdateRequestEnd');
            });
    },

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
