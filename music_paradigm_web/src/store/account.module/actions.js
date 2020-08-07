import { accountService, userService } from '@/_services';

export default {
    resumeLoginStatus({ commit }) {
        accountService.resumeLogin()
            .then(user => {
                if (user) commit('loginSuccess', user);
                else commit('loginFailure');
            })
    },

    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
        accountService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/setErrorAlert', error.message, { root: true });
                }
            );
    },

    logout({ commit }) {
        accountService.logout();
        commit('logout');
    },

    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
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
