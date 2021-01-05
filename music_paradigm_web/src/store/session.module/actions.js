import { accountService } from '@/_services';

export default {
	fetchDueExperimentSession({ commit, dispatch }) {
		commit('isFetchingSession');
		console.log('This was printed');
		return accountService
			.fetchDueExperimentSession()
			.then(
				(sessionInformation) => {
					commit('setFetchedSession', sessionInformation);
					commit('goToPreSession');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('isFetchingSessionEnd');
			});
	},

	fetchSpecificExperimentSession({ commit, dispatch }, associativeId) {
		commit('isFetchingSession');
		return accountService
			.fetchSpecificExperimentSession(associativeId)
			.then(
				(sessionInformation) => {
					commit('setFetchedSession', sessionInformation);
					commit('goToPreSession');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('isFetchingSessionEnd');
			});
	},

	endPresessionMessage({ commit }) {
		commit('endPresessionMessage');
	},

	endPresessionAdvice({ commit }) {
		commit('endPresessionAdvice');
	},

	endPresessionPiano({ commit }) {
		commit('endPresessionPiano');
	},

	startSession({ dispatch, getters }) {
		if (!getters.hasSessionLoaded) return;
		dispatch('experiment/setExperiment', getters.sessionExperiment, { root: true });
		// TODO: Integrate the imposed parameter to the user's progression
		// dispatch('experiment/setParameterValues', getters.imposedParameterValues, { root: true });
		dispatch('experiment/setStartingPoint', getters.sessionCursor, { root: true });
		dispatch('experiment/initExperiment', { root: true });
	},

	clearSessionInformation({ commit }) {
		commit('clearSessionInformation');
	},
};
