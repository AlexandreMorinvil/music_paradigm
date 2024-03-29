import { accountApi } from '@/api';

export default {
	resumeLoginStatus({ commit }) {
		accountApi.resumeLogin().then((user) => {
			if (user) commit('loginSuccess', user);
			else commit('loginFailure');
		});
	},

	login({ dispatch, commit }, { username, password }) {
		commit('loginRequest', { username });
		accountApi.login(username, password).then(
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
		accountApi.logout();
		commit('logout');
	},

	fetchProgressionSummary({ commit, dispatch }) {
		commit('indicateFetchingProgressionSummary');
		return accountApi
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
};
