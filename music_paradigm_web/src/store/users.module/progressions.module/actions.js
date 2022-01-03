import { experimentMarkersApi, usersApi } from '@/api';

export default {
	unsetSelectedProgression({ commit }) {
		commit('unsetSelectedUserProgression');
	},

	refreshSelectedUserProgression({ commit, dispatch, rootGetters }) {
		return usersApi.getById(rootGetters['users/userSelectedId']).then(
			(selectedUser) => {
				commit('setSelectedUserProgression', selectedUser.progression);
				commit('setSelectedUserProgressionSummary', selectedUser.progressionSummary);
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
				(updatedUser) => {
					commit('setSelectedUserProgression', updatedUser.progression);
					commit('setSelectedUserProgressionSummary', updatedUser.progressionSummary);
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
				(updatedUser) => {
					commit('setSelectedUserProgression', updatedUser.progression);
					commit('setSelectedUserProgressionSummary', updatedUser.progressionSummary);
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
			.resetTimeIndicated(getters.userSelectedProgressionId, associativeId)
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
			.delete(getters.userSelectedProgressionId, associativeId)
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
