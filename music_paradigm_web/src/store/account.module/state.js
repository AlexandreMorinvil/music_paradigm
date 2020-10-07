export default {
    status: {
        loggingIn: false,
        loggedIn: false,
        isFetchingProgressionSummary: false,
    },

    user: {
        username: "",
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        role: "",
        curriculum: null,
        progressions: []
    },

    progressionSummary: [{
        title: "",
        delayPreAvailability: null,
        completionsRequiredLeft: null,
        completionsLimitLeft: null,
        isDelayedByPreviousSequential: true,
        isDelayedByPreviousUniqueInDay: true,
    }]
}