export default{
	// Status Updates
	indicateCreateRequest(state) {
		state.status.isCreating = true;
	},

	indicateCreateRequestEnd(state) {
		state.status.isCreating = false;
	},

	indicateAddBlockRequest(state) {
		state.status.isAddingBlock = true;
	},

	indicateAddBlockRequestEnd(state) {
		state.status.isAddingBlock = false;
	},

	setAdminLogSessionId(state, initializedLogSession) {
		state._id = initializedLogSession._id;
	}
};
