import { accountService, sessionService } from '@/_services';

export default {
	fetchDueExperimentSession({ commit, dispatch }) {
		commit('isFetchingSession');
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

	// Bring the user in the experiment mode
	startSession({ dispatch, getters }) {
		if (!getters.hasSessionLoaded) return;
		dispatch('experiment/setExperiment', getters.sessionExperiment, { root: true });
		// TODO: Integrate the imposed parameter to the user's progression
		// dispatch('experiment/setParameterValues', getters.imposedParameterValues, { root: true });
		dispatch('experiment/setStartingPoint', getters.sessionCursor, { root: true });
		dispatch('experiment/initExperiment', null, { root: true });
	},

	// Send a signal to the back-end to indicate that the session can be considered as started
	initializeSession({ commit, dispatch, getters }) {
		commit('setIsInitializingSession');
		return sessionService
			.initializeSession(getters.associativeId)
			.then(
				() => { },
				(error) => {
					// TODO: Keep on memory the failed initialization in localstorage nad reattempt at every time we send log data
					console.log(error)
				},
			)
			.finally(() => {
				commit('setIsInitializingSessionEnd');
			});
	},

	// Send a signal to the back-end to indicate that the session can be considered as completed
	concludeSession({ commit, dispatch, getters }) {
		commit('setIsConcludingSession');
		return sessionService
			.concludeSession(getters.associativeId)
			.then(
				() => { },
				(error) => {
					// TODO : Keep in memory the failed completion in localstorage to make sure on the next login we handle it
					console.log(error)
				},
			)
			.finally(() => {
				dispatch('clearSessionInformation', null, { root: true });
				commit('setIsConcludingSessionEnd');
			});
	},

	abortPresession({ commit, dispatch }) {
		dispatch('clearSessionInformation', null, { root: true });
		commit('leavePreSession');
	},

	clearSessionInformation({ commit }) {
		commit('clearSessionInformation');
	},
};
