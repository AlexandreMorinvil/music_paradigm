import { taskStateMarkersApi, usersApi, progressionsApi } from '@/api';

export default {

	assignCurriculum({ commit, dispatch }, { userId, curriculumId, assignedParameters }) {
		commit('indicateAssigningCurriculum');
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
				commit('indicateAssigningCurriculumEnd');
			});
	},

	assignParameters({ commit, dispatch }, { progressionId, assignedParameters }) {
		commit('indicateAssigningParameters');
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
				commit('indicateAssigningParametersEnd');
			});
	},

	refreshSelectedUserProgression({ commit, dispatch, getters }) {
		commit('indicateFetchingUserProgression');
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
				commit('indicateFetchingUserProgressionEnd');
			});
	},

	revertUserProgressionEditions({ dispatch, getters }) {
		dispatch('edition/setUserProgressionEdition', getters['selection/userProgressionSelection']);
	},

	setSelectedUserProgression({ commit, dispatch }, { progression, progressionSessionsStatus }) {
		dispatch('sessions/setProgressionSessionsStatus', progressionSessionsStatus);
		dispatch('selection/setUserProgressionSelection', progression);
		dispatch('edition/setUserProgressionEdition', progression);


		// TODO: Delete once the code will have been adjusted
		commit('setSelectedUserProgression', progression);
		commit('setSelectedUserProgressionSummary', progressionSessionsStatus);
		dispatch('unsetSelectedSession');
	},

	unsetSelectedUserProgression({ dispatch }) {
		dispatch('selection/unsetUserProgressionSelection');
		dispatch('edition/unsetUserProgressionEdition');
	},

	// FIXME : All the code below this line is from before the refactoring. It will be necessary to update it.

	setSelectedSession({ commit, dispatch }, session) {
		commit('setSelectedSession', session);
		dispatch('unsetSelectedSessionCompletionCount');
	},

	setSelectedSessionCompletionCount({ commit }, completionCount) {
		commit('setSelectedSessionCompletionCount', completionCount);
	},

	// Actions to unset values
	unsetSelectedProgression({ commit, dispatch }) {
		commit('unsetSelectedUserProgression');
		dispatch('unsetSelectedSession');
	},

	unsetSelectedSession({ commit, dispatch }) {
		commit('unsetSelectedSession');
		dispatch('unsetSelectedSessionCompletionCount');
	},

	unsetSelectedSessionCompletionCount({ commit }) {
		commit('unsetSelectedSessionCompletionCount');
	},
};
