import { defaultState } from '@/store-helper/logs.module-helper';

export default {

	clearTaskDataSummariesList(state) {
		state.taskDataSummariesManager.clearTaskDataSummariesList();
	},

	indicateDownloadingTaskDataCsv(state, isActive) {
		state.status.isDownloadingTaskDataCsv = isActive;
	},

	indicateDownloadingTaskDataJson(state, isActive) {
		state.status.isDownloadingTaskDataJson = isActive;
	},

	indicateFetchingTaskDataSummariesList(state, { isActive, isAdminData = false }) {
		if (isAdminData) state.status.isFetchingAdminTaskDataSummariesList = isActive;
		else state.status.isFetchingTaskDataSummariesList = isActive;
	},

	setTaskDataSummariesList(state, { isAdminData, summariesList }) {
		if (isAdminData) state.adminTaskDataSummariesManager.setTaskDataSummariesList(summariesList);
		else state.taskDataSummariesManager.setTaskDataSummariesList(summariesList);
	},

	// TODO: Adjust the code for all the code below this comment

	// Status Updates
	indicateLoadingUserThoroughLogList(state) {
		state.status.isLoadingUserThoroughLogList = true;
	},

	indicateLoadingUserThoroughLogListEnd(state) {
		state.status.isLoadingUserThoroughLogList = false;
	},

	indicateLoadingAdminThoroughLogList(state) {
		state.status.isLoadingAdminThoroughLogList = true;
	},

	indicateLoadingAdminThoroughLogListEnd(state) {
		state.status.isLoadingAdminThoroughLogList = false;
	},

	indicateIsDownloading(state) {
		state.status.isDownloading = true;
	},

	indicateIsDownloadingEnd(state) {
		state.status.isDownloading = false;
	},

	setUserThoroughLogList(state, logSummaryList) {
		state.userThoroughLogList = logSummaryList;
	},

	setAdminThoroughLogList(state, logSummaryList) {
		state.adminThoroughLogList = logSummaryList;
	},

	clearUserThoroughLogs(state) {
		state.userThoroughLogList = defaultState.EMPTY_THOROUGH_LOG_LIST();
	},

	clearAdminThoroughLogs(state) {
		state.adminThoroughLogList = defaultState.EMPTY_THOROUGH_LOG_LIST();
	},

	setSelectedUserThoroughLog(state, log) {
		state.selectedUserThoroughLog = log;
	},

	setSelectedAdminThoroughLog(state, log) {
		state.selectedAdminThoroughLog = log;
	},

	clearSelectedUserThoroughLog(state) {
		state.selectedUserThoroughLog = defaultState.EMPTY_THOROUGH_LOG();
	},

	clearSelectedAdminThoroughLog(state) {
		state.selectedAdminThoroughLog = defaultState.EMPTY_THOROUGH_LOG();
	},
};
