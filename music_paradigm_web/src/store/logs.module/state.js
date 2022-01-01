import { defaultState } from '@/store-helper/logs.module-helper';

export default {
	status: {
		isLoadingUserSimpleLogList: false,
		isLoadingUserThoroughLogList: false,
		isLoadingAdminSimpleLogList: false,
		isLoadingAdminThoroughLogList: false,
	},
	userSimpleLogList: defaultState.EMPTY_SIMPLE_LOG_LIST(),
	userThoroughLogList: defaultState.EMPTY_THOROUGH_LOG_LIST(),
	adminSimpleLogList: defaultState.EMPTY_SIMPLE_LOG_LIST(),
	adminThoroughLogList: defaultState.EMPTY_THOROUGH_LOG_LIST(),
};
