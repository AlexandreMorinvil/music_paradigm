import { userService } from '@/_services';

const initialUser = JSON.parse(localStorage.getItem('user')) || null;

const state = {
    status: {
        loggingIn: false,
        loggedIn: (initialUser) ? true : false
    },

    user: initialUser,
}

const actions = {
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
                    return Promise.reject(error);
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
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
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