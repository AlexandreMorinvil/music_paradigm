import { userService } from '@/_services';

// const initialUser = JSON.parse(localStorage.getItem('user')) || {};

const state = {
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

const getters = {
    isLoggedIn: (state) => {
        return state.status.loggedIn;
    },
    fullName: (state) => {
        return state.user.firstName + " " + state.user.middleName + " " + state.user.lastName;
    }
}

const actions = {
    resumeLoginStatus({ commit }) {
        userService.resumeLogin()
            .then(
                user => {
                    commit('loginSuccess', user);
                },
                error => {
                    commit('loginFailure', error);
                }
            );
    },
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/setErrorAlert', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    // display success message after route change completes
                    dispatch('alert/setSuccessAlert', 'Registration successful', { root: true });
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/setErrorAlert', error, { root: true });
                }
            );
    },
    update({ dispatch, commit }, user) {
        commit('updateRequest', user);

        userService.update(user)
            .then(
                user => {
                    commit('updateSuccess', user);
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/setSuccessAlert', 'Update successful', { root: true });
                    })
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/setErrorAlert', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state) {
        Object.assign(state.status, {
            loggingIn: true,
        });
        state.user = null;
    },
    loginSuccess(state, user) {
        Object.assign(state.status, {
            loggingIn: false,
            loggedIn: true
        });
        state.user = user;
    },
    loginFailure(state) {
        Object.assign(state.status, {
            loggingIn: false,
            loggedIn: false
        });
        state.user = null;
    },
    logout(state) {
        Object.assign(state.status, {
            loggedIn: false
        });
        state.user = null;
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

export const account = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};