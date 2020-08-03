export default {
    isLoggedIn: (state) => {
        return state.status.loggedIn;
    },
    fullName: (state) => {
        return state.user.firstName + " " + state.user.middleName + " " + state.user.lastName;
    }
}