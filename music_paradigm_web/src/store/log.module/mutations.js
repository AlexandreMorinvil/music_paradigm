export default {
	// Status Updates
	indicateAddBlockRequest(state) {
		state.status.isAddingBlock = true;
	},

	indicateAddBlockRequestEnd(state) {
		state.status.isAddingBlock = false;
	},

	setAdminLogSessionId(state, initializedLogSession) {
		state._id = initializedLogSession._id;
	},
};
