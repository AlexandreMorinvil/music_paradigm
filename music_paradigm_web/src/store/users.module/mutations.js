export default {
    // Status Updates
    indicateFetchingUserList(state) {
        state.status.isFetchingUsersHeadersList = true;
    },

    indicateFetchingUserListEnd(state) {
        state.status.isFetchingUsersHeadersList = false;
    },

    // indicateCreateRequest(state) {
    //     state.status.isCreating = true;
    // },

    // indicateCreateRequestEnd(state) {
    //     state.status.isCreating = false;
    // },

    // indicateUpdateRequest(state) {
    //     state.status.isUpdating = true;
    // },

    // indicateUpdateRequestEnd(state) {
    //     state.status.isUpdating = false;
    // },

    // indicateDeleteRequest(state) {
    //     state.status.isDeleting = true;
    // },

    // indicateDeleteRequestEnd(state) {
    //     state.status.isDeleting = false;
    // },

    // Setters
    setSelectedUser(state, user) {
        state.selection = {};
        Object.assign(state.selection, user);
    },

    unsetSelectedExperiment(state) {
        state.selection = {};
    },

    // setEditedExperiment(state, experiment) {
    //     state.edition = {};
    //     Object.assign(state.edition, experiment);
    //     delete state.edition._id;
    // },

    // clearCompiledExperiment(state) {
    //     state.edition = validator.getMinimalValidExperimentStructure();
    // },

    setHeadersList(state, usersHeadersLst) {
        state.usersHeadersList = usersHeadersLst;
    }
};