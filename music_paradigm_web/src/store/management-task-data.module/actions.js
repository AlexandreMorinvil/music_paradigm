import { logsApi } from '@/api';
import { taskDataQueryHandler } from '@/modules/task-data';

export default {

	clearTaskDataSummariesList({ commit }) {
		commit('clearTaskDataSummariesList');
	},

	downloadTaskDataCsv({ commit, dispatch }, { criteria, isAdminData = false }) {
		commit('indicateDownloadingTaskDataCsv', true);
		return logsApi
			.downloadTaskDataCsv(criteria, isAdminData)
			.then(
				() => {
					dispatch(
						'alert/setInformationAlert',
						'Task data CSV file generated and retreived sucessfully',
						{ root: true }
					);
				},
				(error) => {
					dispatch(
						'alert/setErrorAlert',
						`Failed to download the task data CSV file : ${error.message}`,
						{ root: true }
					);
				},
			)
			.finally(() => {
				commit('indicateDownloadingTaskDataCsv', false);
			});
	},

	downloadTaskDataJson({ commit, dispatch }, { criteria, isAdminData = false }) {
		commit('indicateDownloadingTaskDataJson', true);
		return logsApi
			.downloadTaskDataJson(criteria, isAdminData)
			.then(
				() => {
					dispatch(
						'alert/setInformationAlert',
						'Task data JSON file generated and retreived sucessfully',
						{ root: true }
					);
				},
				(error) => {
					dispatch(
						'alert/setErrorAlert',
						`Failed to download the task data JSON file : ${error.message}`,
						{ root: true }
					);
				},
			)
			.finally(() => {
				commit('indicateDownloadingTaskDataJson', false);
			});
	},

	fetchTaskDataSummariesList({ commit, dispatch }, { criteria, isAdminData = false }) {
		commit('indicateFetchingTaskDataSummariesList', { isActive: true, isAdminData });
		return logsApi
			.getTaskDataSummariesList(criteria, isAdminData)
			.then(
				(response) => {
					const { isAdminData, summariesList } = response;
					commit('setTaskDataSummariesList', { summariesList, isAdminData });
				},
				(error) => {
					dispatch(
						'alert/setErrorAlert',
						`Failed to load the task data : ${error.message}`,
						{ root: true }
					);
				},
			)
			.finally(() => {
				commit('indicateFetchingTaskDataSummariesList', { isActive: false, isAdminData });
			});
	},

	// TODO: Adjust the code for all the code below this comment
	// Clearing
	clearUserThoroughLogSummaryList({ commit }) {
		commit('clearUserThoroughLogs');
	},

	clearAdminThoroughLogSummaryList({ commit }) {
		commit('clearAdminThoroughLogs');
	},

	clearSelectedUserThoroughLog({ commit }) {
		commit('clearSelectedUserThoroughLog');
	},

	clearSelectedAdminThoroughLog({ commit }) {
		commit('clearSelectedAdminThoroughLog');
	},

	// Log selection
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
	getUserThoroughLogSummaryList({ commit, dispatch }, rules) {
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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

	getAdminThoroughLogSummaryList({ commit, dispatch }, rules) {
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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
	downloadUserThoroughLogCSV({ commit, dispatch }, rules) {
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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

	downloadAdminThoroughLogCSV({ commit, dispatch }, rules) {
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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
	downloadUserThoroughLogJson({ commit, dispatch }, rules) {
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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

	downloadAdminThoroughLogJson({ commit, dispatch }, rules) {
		const criterias = taskDataQueryHandler.makeTaskDataQueryCriteriaList(rules);
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
