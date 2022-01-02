import { logsApi } from '@/api';
import { logsQuery } from '@/_helpers';

export default {
	clearUserSimpleLogSummaryList({ commit }) {
		commit('clearUserSimpleLogs');
	},

	clearUserThoroughLogSummaryList({ commit }) {
		commit('clearUserThoroughLogs');
	},

	clearAdminSimpleLogSummaryList({ commit }) {
		commit('clearAdminSimpleLogs');
	},

	clearAdminThoroughLogSummaryList({ commit }) {
		commit('clearAdminThoroughLogs');
	},

	getUserSimpleLogSummaryList({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateLoadingUserSimpleLogList');
		return logsApi
			.getUserSimpleLogSummaryList(criterias)
			.then(
				(summarylist) => {
					commit('setUserSimpleLogList', summarylist);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User simple logs list fetch failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateLoadingUserSimpleLogListEnd');
			});
	},

	getUserThoroughLogSummaryList({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateLoadingUserThoroughLogList');
		return logsApi
			.getUserThoroughLogSummaryList(criterias)
			.then(
				(summarylist) => {
					commit('setUserThoroughLogList', summarylist);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User thorough logs list fetch failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateLoadingUserThoroughLogListEnd');
			});
	},

	getAdminSimpleLogSummaryList({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateLoadingAdminSimpleLogList');
		return logsApi
			.getUserSimpleLogSummaryList(criterias)
			.then(
				(summarylist) => {
					commit('setAdminSimpleLogList', summarylist);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin simple logs list fetch failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateLoadingAdminSimpleLogListEnd');
			});
	},

	getAdminThoroughLogSummaryList({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateLoadingAdminThoroughLogList');
		return logsApi
			.getUserThoroughLogSummaryList(criterias)
			.then(
				(summarylist) => {
					commit('setAdminThoroughLogList', summarylist);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin thorough logs list fetch failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateLoadingAdminThoroughLogListEnd');
			});
	},
};
