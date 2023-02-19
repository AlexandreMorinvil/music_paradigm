import { curriculumsApi } from '@/api';

export default {

	createCurriculum({ commit, dispatch }, curriculum) {
		commit('indicateCreateRequest');
		return curriculumsApi
			.create(curriculum)
			.then(
				(createdCurriculum) => {
					dispatch('setSelectedCurriculum', createdCurriculum);
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

	deleteCurriculum({ commit, dispatch }, id) {
		commit('indicateDeleteRequest');
		return curriculumsApi
			.delete(id)
			.then(
				() => {
					dispatch('unsetSelectedCurriculum');
					dispatch('alert/setSuccessAlert', 'Currirulum deletion sucessful', { root: true });
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

	selectCurriculum({ dispatch }, id) {
		return curriculumsApi.getById(id).then(
			(curriculum) => {
				dispatch('setSelectedCurriculum', curriculum);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `Curriculum selection failed : ${error.message}`, { root: true });
			},
		);
	},

	setSelectedCurriculum({ dispatch }, curriculum) {
		dispatch('selection/setCurriculumSelection', curriculum);
		dispatch('edition/setCurriculumEdition', curriculum);
	},

	updateCurriculum({ commit, dispatch }, { id, curriculum }) {
		commit('indicateUpdateRequest');
		return curriculumsApi
			.update(id, curriculum)
			.then(
				(updatedCurriculum) => {
					dispatch('setSelectedCurriculum', updatedCurriculum);
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

	unsetSelectedCurriculum({ dispatch }) {
		dispatch('selection/unsetCurriculumSelection');
		dispatch('edition/unsetCurriculumEdition');
	},
};
