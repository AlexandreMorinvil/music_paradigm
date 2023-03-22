import { progressionsApi, taskStateMarkersApi } from '@/api';

export default {
	assignSessionAdjustments({ commit, dispatch }, { progressionId, sessionIdentifier, adjustments }) {
		commit('indicateAssigningAdjustments');
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
				commit('indicateAssigningAdjustmentsEnd');
			});
	},
	
	deleteTaskStateMarker({ commit, dispatch }, { progressionId, associativeId }) {
		commit('indicateDeletingTaskStateMarker');
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
				commit('indicateDeletingTaskStateMarkerEnd');
			});
	},

	resetSessionTimer({ commit, dispatch }, { progressionId, associativeId }) {
		commit('indicateResettingSessionTimer');
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
				commit('indicateResettingSessionTimerEnd');
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
