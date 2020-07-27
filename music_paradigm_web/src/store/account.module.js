import { userService } from '@/_services';

// const initialUser = JSON.parse(localStorage.getItem('user')) || {};

const state = {
    status: {
        loggingIn: false,
        loggedIn: false//(initialUser) ? true : false
    },

    user: {

    }
}

const actions = {
    resumeLogin({commit}) {
        userService.resumeLogin()
        .then(
            user => {
                commit('loginSuccess', user);
            },
            error => {}
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
    loginRequest(state, user) {
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
    actions,
    mutations
};