import { experimentMarkersApi, usersApi } from '@/api';

export default {
	setSelectedUserProgression({ commit, dispatch }, progressionDetails) {
		dispatch('selection/setUserProgressionSelection', progressionDetails.progression);
		dispatch('edition/setUserProgressionEdition', progressionDetails.progression);


		// TODO: Delete once the code will have been adjusted
		commit('setSelectedUserProgression', progressionDetails.progression);
		commit('setSelectedUserProgressionSummary', progressionDetails.progressionSummary);
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

	// API actions
	refreshSelectedUserProgression({ commit, dispatch, rootGetters }) {
		return usersApi.getById(rootGetters['users/userSelectedId']).then(
			(selectedUserDetails) => {
				commit('setSelectedUserProgression', selectedUserDetails.progression);
				commit('setSelectedUserProgressionSummary', selectedUserDetails.progressionSummary);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `User progression refreshing failed : ${error.message}`, { root: true });
			},
		);
	},

	updateParameters({ commit, dispatch }, { userId, assignedParameters }) {
		commit('indicateUpdateParametersRequest');
		return usersApi
			.assignParameters(userId, assignedParameters)
			.then(
				(updatedUserDetails) => {
					commit('setSelectedUserProgression', updatedUserDetails.progression);
					commit('setSelectedUserProgressionSummary', updatedUserDetails.progressionSummary);
					dispatch('alert/setSuccessAlert', 'Parameter update sucessful', { root: true });
					dispatch('users/fetchAllUsersSummary', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateParametersRequestEnd');
			});
	},

	updateAdjustments({ commit, dispatch }, { userId, assignedAdjustments }) {
		commit('indicateUpdateAdjustmentsRequest');
		return usersApi
			.assignAdjustments(userId, assignedAdjustments)
			.then(
				(updatedUserDetails) => {
					commit('setSelectedUserProgression', updatedUserDetails.progression);
					commit('setSelectedUserProgressionSummary', updatedUserDetails.progressionSummary);
					dispatch('alert/setSuccessAlert', 'Adjustments update sucessful', { root: true });
					dispatch('users/fetchAllUsersSummary', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateAdjustmentsRequestEnd');
			});
	},

	resetSessionTimeIndicated({ commit, dispatch, getters }, associativeId) {
		commit('indicateExperimentMarkerChangeRequest');
		return experimentMarkersApi
			.resetTimeIndicated(getters.progressionSelectedId, associativeId)
			.then(
				(progressionSummary) => {
					commit('setSelectedUserProgressionSummary', progressionSummary);
					dispatch('alert/setSuccessAlert', 'Session progress time indicated reset successful', { root: true });
					dispatch('users/fetchAllUsersSummary', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExperimentMarkerChangeRequestEnd');
			});
	},

	resetSessionProgressKept({ commit, dispatch, getters }, associativeId) {
		commit('indicateExperimentMarkerChangeRequest');
		return experimentMarkersApi
			.delete(getters.progressionSelectedId, associativeId)
			.then(
				(progressionSummary) => {
					commit('setSelectedUserProgressionSummary', progressionSummary);
					dispatch('alert/setSuccessAlert', 'Session progress reset successful', { root: true });
					dispatch('users/fetchAllUsersSummary', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExperimentMarkerChangeRequestEnd');
			});
	},
};
