export default {
    userSelected: (state) => {
        return state.selection.content;
    },

    userSelectedId: (state)=> {
        return state.selection._id;
    },

    usersHeadersList: (state) => {
        return state.usersHeadersList;
    },

    // Status
    isFetchingExperimentHeadersList: (state) => {
        return state.status.isFetchingExperimentHeadersList;
    }
}