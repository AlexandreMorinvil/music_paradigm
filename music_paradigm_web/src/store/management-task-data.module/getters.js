export default {

	adminTaskDataSummariesList: (state) => {
		return state.adminTaskDataSummariesManager.taskDataSummariesList;
	},

	isDownloadingTaskDataCsv: (state) => {
		return state.status.isDownloadingTaskDataCsv;
	},

	isDownloadingTaskDataJson: (state) => {
		return state.status.isDownloadingTaskDataJson;
	},

	isFetchingAdminTaskDataSummariesList: (state) => {
		return state.status.isFetchingAdminTaskDataSummariesList;
	},

	isFetchingTaskDataSummariesList: (state) => {
		return state.status.isFetchingTaskDataSummariesList;
	},

	taskDataSummariesList: (state) => {
		return state.taskDataSummariesManager.taskDataSummariesList;
	},

	// TODO: Ajust the code below this line
	// Status Getters
	isLoadingUserThoroughLogList: (state) => {
		return state.status.isLoadingUserThoroughLogList || false;
	},

	isLoadingAdminThoroughLogList: (state) => {
		return state.status.isLoadingAdminThoroughLogList || false;
	},

	isDownloadingLogs: (state) => {
		return state.status.isDownloading || false;
	},

	// Log summary lists
	userThoroughLogList: (state) => {
		return state.userThoroughLogList;
	},

	adminThoroughLogList: (state) => {
		return state.adminThoroughLogList;
	},

	// Selected log
	selectedUserThoroughLog: (state) => {
		return state.selectedUserThoroughLog;
	},

	selectedAdminThoroughLog: (state) => {
		return state.selectedAdminThoroughLog;
	},
};
