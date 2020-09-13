export default {
    userSelectedId: (state)=> {
        return state.selection._id;
    },
    
    userSelectedUsername: (state) => {
        return state.selection.username;
    },

    userSelectedEmail: (state) => {
        return state.selection.email;
    },

    userSelectedFirstName: (state) => {
        return state.selection.firstName;
    },

    userSelectedMiddleName: (state) => {
        return state.selection.middleName;
    },

    userSelectedLastName: (state) => {
        return state.selection.lastName;
    },

    userSelectedGroups: (state) => {
        return state.selection.groups;
    },

    userSelectedRole: (state) => {
        return state.selection.role;
    },

    usersHeadersList: (state) => {
        return state.usersHeadersList;
    },

    // Status
    hasSelectedUser: (state) => {
        return Boolean(state.selection._id);
    },

    isFetchingUserHeadersList: (state) => {
        return state.status.isFetchingUsersHeadersList;
    }
}