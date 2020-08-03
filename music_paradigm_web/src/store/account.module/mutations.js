import functions from './functions';

export default {
    loginRequest(state) {
        // Set the status to logined in
        Object.assign(state.status, {
            loggingIn: true,
        });
    },

    loginSuccess(state, user) {
        // Assing the received user to the store user
        functions.assignUser(state.user, user);

        // Set the status to logined in
        Object.assign(state.status, {
            loggingIn: false,
            loggedIn: true
        });
    },

    loginFailure(state) {
        // Empty the store user
        functions.assignUser(state.user, {});

        // Set the status to not logged in and not logging in
        Object.assign(state.status, {
            loggingIn: false,
            loggedIn: false
        });
    },

    logout(state) {
        // Empty the store user
        functions.assignUser(state.user, {});

        // Set the status to not logged in
        Object.assign(state.status, {
            loggedIn: false
        });
    },

    registerRequest(state) {
        state.status = { registering: true };
    },

    registerSuccess(state) {
        state.status = { registered: true };
    },

    registerFailure(state) {
        state.status = {};
    },

    updateRequest(state) {
        state.status = { updating: true };
    },

    updateSuccess(state) {
        state.status = { updated: true };
    },

    updateFailure(state) {
        state.status = {};
    }
};