import { curriculumsApi } from '@/api';

export default {
	fetchAllCurriculumHeaders({ commit, dispatch }) {
		commit('indicateFetchingCurriculumList');
		return curriculumsApi
			.getListAllHeaders()
			.then(
				(curriculumsList) => {
					commit('setHeadersList', curriculumsList);
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateFetchingCurriculumListEnd');
			});
	},

	setSelectedCurriculum({ commit, dispatch }, id) {
		return curriculumsApi.getById(id).then(
			(user) => {
				commit('setSelectedCurriculum', user);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `Curriculum selection failed : ${error.message}`, { root: true });
			},
		);
	},

	unsetSelectedCurriculum({ commit }) {
		commit('unsetSelectedCurriculum');
	},

	createCurriculum({ commit, dispatch }, curriculum) {
		commit('indicateCreateRequest');
		return curriculumsApi
			.create(curriculum)
			.then(
				(createdCurriculum) => {
					commit('setSelectedCurriculum', createdCurriculum);
					dispatch('alert/setSuccessAlert', 'Curriculum creation sucessful', {
						root: true,
					});
					dispatch('fetchAllCurriculumHeaders');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateCreateRequestEnd');
			});
	},

	updateCurriculum({ commit, dispatch }, { id, curriculum }) {
		commit('indicateUpdateRequest');
		return curriculumsApi
			.update(id, curriculum)
			.then(
				(updatedCurriculum) => {
					commit('setSelectedCurriculum', updatedCurriculum);
					dispatch('alert/setSuccessAlert', 'Curriculum update sucessful', {
						root: true,
					});
					dispatch('fetchAllCurriculumHeaders');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateRequestEnd');
			});
	},

	deleteCurriculum({ commit, dispatch }, id) {
		commit('indicateDeleteRequest');
		return curriculumsApi
			.delete(id)
			.then(
				() => {
					commit('unsetSelectedCurriculum');
					dispatch('alert/setSuccessAlert', 'Currirulum deletion sucessful', {
						root: true,
					});
					dispatch('fetchAllCurriculumHeaders');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateDeleteRequestEnd');
			});
	},
};
