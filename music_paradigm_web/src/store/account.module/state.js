export default {
    status: {
        loggingIn: false,
        loggedIn: false//(initialUser) ? true : false
    },

    // TODO: Fit it for the assignment to be done more properly
    user: {
        // Management information of the user
        username: "",
        email: "",
        role: "",

        // Description of the user
        firstName: "First",
        middleName: "Middle",
        lastName: "Last",

        // Tasks of the user
        tasks: {
            curriculums: [],
            progression: []
        }
    }
}