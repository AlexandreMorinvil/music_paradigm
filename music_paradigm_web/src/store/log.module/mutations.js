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

	setLogId(state, setLogId) {
		state.setLogId = setLogId;
	},
};
