import { progressionsApi } from '@/api';

export default {

	assignCurriculum({ commit, dispatch }, { userId, curriculumId, assignedParameters }) {
		commit('indicateAssigningCurriculum', true);
		return progressionsApi
			.assignCurriculum({ userId, curriculumId, assignedParameters })
			.then(
				(response) => {
					dispatch('setSelectedUserProgression', response);
					dispatch('alert/setSuccessAlert', 'Curriculum assignation sucessful', { root: true });
					dispatch('managementUsers/fetchUserSummariesList', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Curriculum assignation failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateAssigningCurriculum', false);
			});
	},

	assignParameters({ commit, dispatch }, { progressionId, assignedParameters }) {
		commit('indicateAssigningParameters', true);
		return progressionsApi
			.assignParameters(progressionId, assignedParameters)
			.then(
				(response) => {
					dispatch('setSelectedUserProgression', response);
					dispatch('alert/setSuccessAlert', 'Parameter update sucessful', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateAssigningParameters', false);
			});
	},

	refreshSelectedUserProgression({ commit, dispatch, getters }) {
		commit('indicateFetchingUserProgression', true);
		return progressionsApi
			.getProgressionById(getters['selection/userProgressionSelectionId'])
			.then(
				(response) => {
					dispatch('setSelectedUserProgression', response);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User curriculum progression refreshing failed : ${error.message}`, { root: true });
				},
			).finally(() => {
				commit('indicateFetchingUserProgression', false);
			});
	},

	revertUserProgressionEditions({ dispatch, getters }) {
		dispatch('edition/setUserProgressionEdition', getters['selection/userProgressionSelection']);
	},

	setSelectedUserProgression({ dispatch }, { progression, progressionSessionsStatus }) {
		dispatch('sessions/unsetSelectedProgressionSession');
		dispatch('sessions/setProgressionSessionsStatus', progressionSessionsStatus);
		dispatch('selection/setUserProgressionSelection', progression);
		dispatch('edition/setUserProgressionEdition', progression);
	},

	unsetSelectedUserProgression({ dispatch }) {
		dispatch('sessions/unsetSelectedProgressionSession');
		dispatch('selection/unsetUserProgressionSelection');
		dispatch('edition/unsetUserProgressionEdition');
	},
};
