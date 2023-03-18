import { curriculumsApi } from '@/api';

export default {

	createCurriculum({ commit, dispatch }, curriculum) {
		commit('indicateCreateRequest');
		return curriculumsApi
			.createCurriculum(curriculum)
			.then(
				(createdCurriculum) => {
					dispatch('setSelectedCurriculum', createdCurriculum);
					dispatch('alert/setSuccessAlert', 'Curriculum creation sucessful', {
						root: true,
					});
					dispatch('fetchCurriculumSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateCreateRequestEnd');
			});
	},

	deleteCurriculum({ commit, dispatch }, curriculumId) {
		commit('indicateDeleteRequest');
		return curriculumsApi
			.deleteCurriculum(curriculumId)
			.then(
				() => {
					dispatch('unsetSelectedCurriculum');
					dispatch('alert/setSuccessAlert', 'Currirulum deletion sucessful', { root: true });
					dispatch('fetchCurriculumSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateDeleteRequestEnd');
			});
	},

	fetchCurriculumSummariesList({ commit, dispatch }) {
		commit('indicateFetchingCurriculumList');
		return curriculumsApi
			.getCurriculumSummariesList()
			.then(
				(curriculumSummariesList) => {
					commit('setCurriculumSummariesList', curriculumSummariesList);
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateFetchingCurriculumListEnd');
			});
	},

	selectCurriculum({ dispatch }, curriculumId) {
		return curriculumsApi.getCurriculumById(curriculumId).then(
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
			.updateCurriculum(id, curriculum)
			.then(
				(updatedCurriculum) => {
					dispatch('setSelectedCurriculum', updatedCurriculum);
					dispatch('alert/setSuccessAlert', 'Curriculum update sucessful', {
						root: true,
					});
					dispatch('fetchCurriculumSummariesList');
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
