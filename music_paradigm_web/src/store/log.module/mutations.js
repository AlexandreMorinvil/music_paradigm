import defaultState from '@/store-helper/log.module-helper/default-state';

export default {
	// Status Updates
	indicateInitializeLogRequest(state) {
		state.status.isInitializingLog = true;
	},

	indicateInitializeLogRequestEnd(state) {
		state.status.isInitializingLog = false;
	},

	indicateAddBlockRequest(state) {
		state.status.isAddingBlock = true;
	},

	indicateAddBlockRequestEnd(state) {
		state.status.isAddingBlock = false;
	},

	indicateConcludeLogRequest(state) {
		state.status.isConcludingLog = true;
	},

	indicateConcludeLogRequestEnd(state) {
		state.status.isConcludingLog = false;
	},

	setLogType(state, logType) {
		state.logType = logType || defaultState.DEFAULT_LOG_TYPE();
	},

	clearLogType(state) {
		state.logType = defaultState.DEFAULT_LOG_TYPE();
	},
};
