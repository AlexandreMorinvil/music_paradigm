export default {
    isLoggedIn: (state) => {
        return state.status.loggedIn;
    },

    isLoggingIn: (state) => {
        return state.status.loggingIn;
    },

    fullName: (state) => {
        return state.user.firstName + " " +
            (state.user.middleName ? state.user.middleName + " " : "") +
            state.user.lastName;
    },

    isFetchingProgressionSummary: (state) => {
        return state.status.isFetchingProgressionSummary;
    },

    progressionSummary: (state) => {
        return state.progressionSummary;
    }
}