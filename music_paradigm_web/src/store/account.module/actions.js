import { accountService } from '@/_services';
import getters from './getters';

export default {
	resumeLoginStatus({ commit }) {
		accountService.resumeLogin().then((user) => {
			if (user) commit('loginSuccess', user);
			else commit('loginFailure');
		});
	},

	login({ dispatch, commit }, { username, password }) {
		commit('loginRequest', { username });
		accountService.login(username, password).then(
			(user) => {
				commit('loginSuccess', user);
			},
			(error) => {
				commit('loginFailure', error);
				dispatch('alert/setErrorAlert', error.message, { root: true });
			},
		);
	},

	logout({ commit }) {
		accountService.logout();
		commit('logout');
	},

	fetchProgressionSummary({ commit, dispatch }) {
		commit('indicateFetchingProgressionSummary');
		return accountService
			.fetchProgressionSummary()
			.then(
				(progressionSummary) => {
					commit('setProgressionSummary', progressionSummary.history);
					commit('setDueExperiment', progressionSummary.dueExperiment);
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateFetchingProgressionSummaryEnd');
			});
	},

	fetchDueExperimentSession({ commit, dispatch }) {
		commit('isFetchingSession');
		return accountService
			.fetchDueExperimentSession()
			.then(
				(sessionInformation) => {
					commit('setFetchedSession', sessionInformation);
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
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('isFetchingSessionEnd');
			});
	},

	clearSessionInformation({ commit }) {
		commit('clearSessionInformation');
	},

	startSession({ dispatch }) {
		if (!getters.hasSessionLoaded) return;
		dispatch('experiment/setExperiment', getters.sessionExperiment, { root: true });
		// dispatch('experiment/setParameterValues', getters.imposedParameterValues, { root: true });
		dispatch('experiment/setStartingPoint', getters.sessionCursor, { root: true });
		dispatch('experiment/initExperiment', { root: true });
	},
};
