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

	fetchSpecificExperimentSession({ commit, dispatch }, { associativeId, associativeIdOrdinalNumber }) {
		commit('isFetchingSession');
		return accountService
			.fetchSpecificExperimentSession(associativeId, associativeIdOrdinalNumber)
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
		dispatch('experiment/setParameterValues', getters.assignedParameters, { root: true });
		dispatch('experiment/setStartingPoint', getters.sessionCursor, { root: true });
		dispatch('experiment/initExperiment', getters.sessionState, { root: true });
		dispatch('experiment/initInitialTime', getters.sessionInitialTime, { root: true });
	},

	// Send a signal to the back-end to indicate that the session can be considered as started
	initializeSession({ commit, getters }) {
		commit('setIsInitializingSession');
		return sessionService
			.initializeSession(getters.associativeId, getters.associativeIdOrdinalNumber)
			.then(
				() => {
					/* Nothing is done */
				},
				(error) => {
					// TODO: Keep on memory the failed initialization in localstorage nad reattempt at every time we send log data
					console.log(error);
				},
			)
			.finally(() => {
				commit('setIsInitializingSessionEnd');
			});
	},

	// Send a signal to the back-end to indicate that the session can be considered as completed
	concludeSession({ commit, dispatch, getters }, isInTimeUp) {
		commit('setIsConcludingSession');
		return sessionService
			.concludeSession(getters.associativeId, getters.associativeIdOrdinalNumber, isInTimeUp)
			.then(
				() => {
					/* Nothing is done */
				},
				(error) => {
					// TODO : Keep in memory the failed completion in localstorage to make sure on the next login we handle it
					console.log(error);
				},
			)
			.finally(() => {
				dispatch('clearSessionInformation', null, { root: true });
				commit('setIsConcludingSessionEnd');
			});
	},

	// Send a signal to the back-end to indicate that the session can be considered as started
	saveSessionState({ commit, getters, rootGetters }) {
		commit('setIsSavingSessionState');
		return sessionService
			.saveSessionState(
				getters.associativeId, 
				rootGetters['experiment/cursor'],
				rootGetters['experiment/state'],
				rootGetters['experiment/timeIndicated'],
			)
			.then(
				() => {
					/* Nothing is done */
				},
				(error) => {
					// TODO: Keep on memory the failed state to save in localstorage and reattempt at every time we send log data
					console.log(error);
				},
			)
			.finally(() => {
				commit('setIsSavingSessionStateEnd');
			});
	},

	// Send a signal to the back-end to indicate that the session can be considered as completed
	forgetSessionState({ commit, getters }) {
		commit('setIsForgettingSessionState');
		return sessionService
			.forgetSessionState(getters.associativeId)
			.then(
				() => {
					/* Nothing is done */
				},
				(error) => {
					// TODO : Keep in memory the failed completion in localstorage to make sure on the next login we handle it
					console.log(error);
				},
			)
			.finally(() => {
				commit('setIsForgettingSessionStateEnd');
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
