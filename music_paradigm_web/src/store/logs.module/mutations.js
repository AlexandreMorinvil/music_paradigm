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

	setUserSimpleLogList(state, userSimpleLogList) {
		state.userSimpleLogList = userSimpleLogList;
	},

	setUserThoroughLogList(state, userThoroughLogList) {
		state.userThoroughLogList = userThoroughLogList;
	},

	setAdminSimpleLogList(state, adminSimpleLogList) {
		state.adminSimpleLogList = adminSimpleLogList;
	},

	setAdminThoroughLogList(state, adminThoroughLogList) {
		state.adminThoroughLogList = adminThoroughLogList;
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
};
