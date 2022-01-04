export default {
	// Status Getters
	isLoadingUserSimpleLogList: (state) => {
		return state.status.isLoadingUserSimpleLogList || false;
	},

	isLoadingUserThoroughLogList: (state) => {
		return state.status.isLoadingUserThoroughLogList || false;
	},

	isLoadingAdminSimpleLogList: (state) => {
		return state.status.isLoadingAdminSimpleLogList || false;
	},

	isLoadingAdminThoroughLogList: (state) => {
		return state.status.isLoadingAdminThoroughLogList || false;
	},

	isDownloadingLogs: (state) => {
		return state.status.isDownloading || false;
	},

	// Log summary lists
	userSimpleLogList: (state) => {
		return state.userSimpleLogList;
	},

	userThoroughLogList: (state) => {
		return state.userThoroughLogList;
	},

	adminSimpleLogList: (state) => {
		return state.userSimpleLogList;
	},

	adminThoroughLogList: (state) => {
		return state.userThoroughLogList;
	},

	// Selected log
	selectedUserSimpleLog: (state) => {
		return state.selectedUserSimpleLog;
	},

	selectedUserThoroughLog: (state) => {
		return state.selectedUserThoroughLog;
	},

	selectedAdminSimpleLog: (state) => {
		return state.selectedAdminSimpleLog;
	},

	selectedAdminThoroughLog: (state) => {
		return state.selectedAdminThoroughLog;
	},
};
