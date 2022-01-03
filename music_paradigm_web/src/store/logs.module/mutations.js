import { defaultState } from '@/store-helper/logs.module-helper';

export default {
	// Status Updates
	indicateLoadingUserSimpleLogList(state) {
		state.status.isLoadingUserSimpleLogList = true;
	},

	indicateLoadingUserSimpleLogListEnd(state) {
		state.status.isLoadingUserSimpleLogList = false;
	},

	indicateLoadingUserThoroughLogList(state) {
		state.status.isLoadingUserThoroughLogList = true;
	},

	indicateLoadingUserThoroughLogListEnd(state) {
		state.status.isLoadingUserThoroughLogList = false;
	},

	indicateLoadingAdminSimpleLogList(state) {
		state.status.isLoadingAdminSimpleLogList = true;
	},

	indicateLoadingAdminSimpleLogListEnd(state) {
		state.status.isLoadingAdminSimpleLogList = false;
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

	setUserSimpleLogList(state, logSummaryList) {
		state.userSimpleLogList = logSummaryList;
	},

	setUserThoroughLogList(state, logSummaryList) {
		state.userThoroughLogList = logSummaryList;
	},

	setAdminSimpleLogList(state, logSummaryList) {
		state.adminSimpleLogList = logSummaryList;
	},

	setAdminThoroughLogList(state, logSummaryList) {
		state.adminThoroughLogList = logSummaryList;
	},

	clearUserSimpleLogs(state) {
		state.userSimpleLogList = defaultState.EMPTY_SIMPLE_LOG_LIST();
	},

	clearUserThoroughLogs(state) {
		state.userThoroughLogList = defaultState.EMPTY_THOROUGH_LOG_LIST();
	},

	clearAdminSimpleLogs(state) {
		state.adminSimpleLogList = defaultState.EMPTY_SIMPLE_LOG_LIST();
	},

	clearAdminThoroughLogs(state) {
		state.adminThoroughLogList = defaultState.EMPTY_THOROUGH_LOG_LIST();
	},

	setSelectedUserSimpleLog(state, log) {
		state.selectedUserSimpleLog = log;
	},

	setSelectedUserThoroughLog(state, log) {
		state.selectedUserThoroughLog = log;
	},

	setSelectedAdminSimpleLog(state, log) {
		state.selectedAdminSimpleLog = log;
	},

	setSelectedAdminThoroughLog(state, log) {
		state.selectedAdminThoroughLog = log;
	},

	clearSelectedUserSimpleLog(state) {
		state.selectedUserSimpleLog = defaultState.EMPTY_SIMPLE_LOG();
	},

	clearSelectedUserThoroughLog(state) {
		state.selectedUserThoroughLog = defaultState.EMPTY_THOROUGH_LOG();
	},

	clearSelectedAdminSimpleLog(state) {
		state.selectedAdminSimpleLog = defaultState.EMPTY_SIMPLE_LOG();
	},

	clearSelectedAdminThoroughLog(state) {
		state.selectedAdminThoroughLog = defaultState.EMPTY_THOROUGH_LOG();
	},
};
