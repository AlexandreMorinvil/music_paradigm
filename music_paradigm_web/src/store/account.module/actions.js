import { userService } from '@/_services';

export default {
    resumeLoginStatus({ commit }) {
        userService.resumeLogin()
            .then(user => { commit('loginSuccess', user); })
            .catch(() => { commit('loginFailure'); });
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
}
