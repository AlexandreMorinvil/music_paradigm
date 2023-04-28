import { defaultState } from '@/store-helper/logs.module-helper';

export default {
	status: {
		isLoadingUserThoroughLogList: false,
		isLoadingAdminThoroughLogList: false,
		isDownloading: false,
	},

	userThoroughLogList: defaultState.EMPTY_THOROUGH_LOG_LIST(),
	adminThoroughLogList: defaultState.EMPTY_THOROUGH_LOG_LIST(),

	selectedUserThoroughLog: defaultState.EMPTY_THOROUGH_LOG(),
	selectedAdminThoroughLog: defaultState.EMPTY_THOROUGH_LOG(),
};
