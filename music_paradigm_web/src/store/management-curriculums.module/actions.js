import { curriculumsApi } from '@/api';

export default {

	createCurriculum({ commit, dispatch }, curriculum) {
		commit('indicateCreatingCurriculum', true);
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
				commit('indicateCreatingCurriculum', false);
			});
	},

	deleteCurriculum({ commit, dispatch }, curriculumId) {
		commit('indicateDeletingCurriculum', true);
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
				commit('indicateDeletingCurriculum', false);
			});
	},

	fetchCurriculumSummariesList({ commit, dispatch }) {
		commit('indicateFetchingCurriculumSummariesList', true);
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
				commit('indicateFetchingCurriculumSummariesList', false);
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
		commit('indicateUpdatingCurriculum', true);
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
				commit('indicateUpdatingCurriculum', false);
			});
	},

	unsetSelectedCurriculum({ dispatch }) {
		dispatch('selection/unsetCurriculumSelection');
		dispatch('edition/unsetCurriculumEdition');
	},
};
