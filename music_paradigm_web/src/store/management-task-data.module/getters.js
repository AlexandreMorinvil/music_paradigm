export default {
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
