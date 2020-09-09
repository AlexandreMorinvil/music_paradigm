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
    isFetchingUserHeadersList: (state) => {
        return state.status.isFetchingUsersHeadersList;
    }
}