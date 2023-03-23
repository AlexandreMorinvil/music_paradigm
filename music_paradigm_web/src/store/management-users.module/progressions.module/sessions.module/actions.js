import { progressionsApi, taskStateMarkersApi } from '@/api';

export default {
	assignSessionAdjustments({ commit, dispatch }, { progressionId, sessionIdentifier, adjustments }) {
		commit('indicateAssigningAdjustments', true);
		return progressionsApi
			.assignSessionAdjustments(progressionId, sessionIdentifier, adjustments)
			.then(
				({ progressionSessionsStatus }) => {
					dispatch('setProgressionSessionsStatus', progressionSessionsStatus);
					dispatch('alert/setSuccessAlert', 'Session adjustments update sucessful', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateAssigningAdjustments', false);
			});
	},
	
	deleteTaskStateMarker({ commit, dispatch }, { progressionId, associativeId }) {
		commit('indicateDeletingTaskStateMarker', true);
		return taskStateMarkersApi
			.deleteTaskStateMarker(progressionId, associativeId)
			.then(
				({ progressionSessionsStatus }) => {
					dispatch('setProgressionSessionsStatus', progressionSessionsStatus);
					dispatch('alert/setSuccessAlert', 'The task progress of the session was reset successfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateDeletingTaskStateMarker', false);
			});
	},

	resetSessionTimer({ commit, dispatch }, { progressionId, associativeId }) {
		commit('indicateResettingSessionTimer', true);
		return taskStateMarkersApi
			.resetSessionTimer(progressionId, associativeId)
			.then(
				({ progressionSessionsStatus }) => {
					dispatch('setProgressionSessionsStatus', progressionSessionsStatus);
					dispatch('alert/setSuccessAlert', 'Session timer reset successfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateResettingSessionTimer', false);
			});
	},

	setProgressionSessionsStatus({ commit }, progressionSessionsStatus) {
		commit('setProgressionSessionsStatus', progressionSessionsStatus);
	},

	setSelectedProgressionSession({ dispatch }, session) {
		dispatch('selection/setProgressionSessionSelection', session);
		dispatch('edition/setProgressionSessionEdition', session);
	},

	unsetSelectedProgressionSession({ dispatch }) {
		dispatch('selection/unsetProgressionSessionSelection');
		dispatch('edition/unsetProgressionSessionEdition');
	}
};
