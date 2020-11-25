export default {
    // Status Updates
    indicateCreateRequest(state) {
        state.status.isCreating = true;
    },

    indicateCreateRequestEnd(state) {
        state.status.isCreating = false;
    },
};