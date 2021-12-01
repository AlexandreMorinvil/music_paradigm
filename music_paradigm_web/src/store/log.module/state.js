import defaultState from '@/store-helper/log.module-helper/default-state';

export default {
	status: {
		isInitializingLog: false,
		isAddingBlock: false,
		isConcludingLog: false,
	},
	logType: defaultState.DEFAULT_LOG_TYPE(),
};
