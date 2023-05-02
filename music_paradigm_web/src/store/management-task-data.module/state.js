import { defaultState } from '@/store-helper/logs.module-helper';
import { TaskDataSummariesManager } from '@/modules/task-data';

export default {
	status: {
		isDownloadingTaskDataCsv: false,
		isFetchingTaskDataSummariesList: false,

		// TODO: Ajust code below this line
		isLoadingUserThoroughLogList: false,
		isLoadingAdminThoroughLogList: false,
		isDownloading: false,
	},

	taskDataSummariesManager: new TaskDataSummariesManager(),

	// TODO: Adjust the code below
	userThoroughLogList: defaultState.EMPTY_THOROUGH_LOG_LIST(),
	adminThoroughLogList: defaultState.EMPTY_THOROUGH_LOG_LIST(),

	selectedUserThoroughLog: defaultState.EMPTY_THOROUGH_LOG(),
	selectedAdminThoroughLog: defaultState.EMPTY_THOROUGH_LOG(),
};
