/* eslint-disable max-lines-per-function */
import { logsApi } from '@/api';

export default {
	clearUserLogSummaryList({ dispatch }) {
		dispatch('clearUserSimpleLogSummaryList');
		dispatch('clearUserThoroughLogSummaryList');
	},

	clearUserSimpleLogSummaryList({ commit }) {
		commit('clearUserSimpleLogs');
	},

	clearUserThoroughLogSummaryList({ commit }) {
		commit('clearUserThoroughLogs');
	},

	clearAdminLogSummaryList({ dispatch }) {
		dispatch('clearAdminSimpleLogSummaryList');
		dispatch('clearAdminThoroughLogSummaryList');
	},

	clearAdminSimpleLogSummaryList({ commit }) {
		commit('clearAdminSimpleLogs');
	},

	clearAdminThoroughLogSummaryList({ commit }) {
		commit('clearAdminThoroughLogs');
	},

	getUserSimpleLogSummaryList({ commit, dispatch }, { userId, progressionId, associativeId }) {
		commit('indicateLoadingUserSimpleLogList');
		return logsApi
			.getUserSimpleLogSummaryList({ userId, progressionId, associativeId })
			.then(
				(summarylist) => {
					commit('setUserSimpleLogList', summarylist);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User simple logs list refreshing failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateLoadingUserSimpleLogListEnd');
			});
	},

	getUserThoroughLogSummaryList({ commit, dispatch }, { userId, progressionId, associativeId }) {
		commit('indicateLoadingUserThoroughLogList');
		return logsApi
			.getUserThoroughLogSummaryList({ userId, progressionId, associativeId })
			.then(
				(summarylist) => {
					commit('setUserThoroughLogList', summarylist);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User thorough logs list refreshing failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateLoadingUserThoroughLogListEnd');
			});
	},

	// addSimmpleLogBlock({ commit }) {
	// 	const query = constructSimpleLogQuery(criterias);
	// 	commit('indicateAddBlockRequest');
	// 	return logService
	// 		.addSimpleLogBlock(block)
	// 		.then(
	// 			() => {
	// 				// Nothing is done
	// 			},
	// 			(error) => {
	// 				console.log(error);
	// 			},
	// 		)
	// 		.finally(() => commit('indicateAddBlockRequestEnd'));
	// },
};
