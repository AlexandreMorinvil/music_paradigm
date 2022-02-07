import { logsApi } from '@/api';
import { logsQuery } from '@/_helpers';

export default {
	// Clearing
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

	clearSelectedUserSimpleLog({ commit }) {
		commit('clearSelectedUserSimpleLog');
	},

	clearSelectedUserThoroughLog({ commit }) {
		commit('clearSelectedUserThoroughLog');
	},

	clearSelectedAdminSimpleLog({ commit }) {
		commit('clearSelectedAdminSimpleLog');
	},

	clearSelectedAdminThoroughLog({ commit }) {
		commit('clearSelectedAdminThoroughLog');
	},

	// Log selection
	getSpecificUserSimpleLog({ commit, dispatch }, logId) {
		return logsApi
			.getSpecificUserSimpleLog(logId)
			.then(
				(log) => {
					commit('setSelectedUserSimpleLog', log);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User simple log fetch failed : ${error.message}`, { root: true });
				}
			);
	},

	getSpecificUserThoroughLog({ commit, dispatch }, logId) {
		return logsApi
			.getSpecificUserThoroughLog(logId)
			.then(
				(log) => {
					commit('setSelectedUserThoroughLog', log);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User thorough log fetch failed : ${error.message}`, { root: true });
				}
			);
	},

	getSpecificAdminSimpleLog({ commit, dispatch }, logId) {
		return logsApi
			.getSpecificAdminSimpleLog(logId)
			.then(
				(log) => {
					commit('setSelectedAdminSimpleLog', log);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin simple log fetch failed : ${error.message}`, { root: true });
				}
			);
	},

	getSpecificAdminThoroughLog({ commit, dispatch }, logId) {
		return logsApi
			.getSpecificAdminThoroughLog(logId)
			.then(
				(log) => {
					commit('setSelectedAdminThoroughLog', log);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin thorough log fetch failed : ${error.message}`, { root: true });
				}
			);
	},

	// Summary lists
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
			.getAdminSimpleLogSummaryList(criterias)
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
			.getAdminThoroughLogSummaryList(criterias)
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

	// Basic CSV fetching
	downloadUserSimpleLogCSV({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getUserSimpleLogCsv(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Simple log CSV file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User simple logs CSV download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	downloadUserThoroughLogCSV({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getUserThoroughLogCsv(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Thorough log CSV file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User thorough logs CSV download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	downloadAdminSimpleLogCSV({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getAdminSimpleLogCsv(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Admin simple log CSV file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin simple logs CSV download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	downloadAdminThoroughLogCSV({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getAdminThoroughLogCsv(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Admin thorough log CSV file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin thorough logs CSV download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	// Unwound CSV fetchin
	downloadUserThoroughLogUnwoundCSV({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getUserThoroughLogUnwoundCsv(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Thorough log unwound CSV file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User thorough logs unwound CSV download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	downloadAdminThoroughLogUnwoundCSV({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getAdminThoroughLogUnwoundCsv(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Admin thorough log unwound CSV file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin thorough logs unwound CSV download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	// JSON fetching
	downloadUserSimpleLogJson({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getUserSimpleLogJson(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Simple log JSON file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User simple logs JSON download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	downloadUserThoroughLogJson({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getUserThoroughLogJson(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Thorough log JSON file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User simple logs JSON download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	downloadAdminSimpleLogJson({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getAdminSimpleLogJson(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Admin simple log JSON file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin simple logs JSON download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},

	downloadAdminThoroughLogJson({ commit, dispatch }, rules) {
		const criterias = logsQuery.makeLogQueryCriteriaList(rules);
		commit('indicateIsDownloading');
		return logsApi
			.getAdminThoroughLogJson(criterias)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Admin thorough log JSON file generated and retreived sucessfully', { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Admin simple logs JSON download failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDownloadingEnd');
			});
	},
};
