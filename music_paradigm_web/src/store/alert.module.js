const state = {
    type: null,
    message: null
};

const getters = {
    hasAlert: (state) => {
        return !!(state.type);
    },
    alertType: (state) => {
        return state.type || "No type";
    },
    alertMessage: (state) => {
        return state.message || "No message";
    },
};

const actions = {
    setSuccessAlert({ commit }, message) {
        commit('setSuccessAlert', message);
    },
    setInformationAlert({ commit }, message) {
        commit('setInformationAlert', message);
    },
    setWarningAlert({ commit }, message) {
        commit('setWarningAlert', message);
    },
    setErrorAlert({ commit }, message) {
        commit('setErrorAlert', message);
    },
    clearAlert({ commit }, message) {
        commit('clearAlert', message);
    }
};

const mutations = {
    setSuccessAlert(state, message) {
        state.type = 'success';
        state.message = message;
    },    
    setInformationAlert(state, message) {
        state.type = 'information';
        state.message = message;
    },
    setWarningAlert(state, message) {
        state.type = 'warning';
        state.message = message;
    },
    setErrorAlert(state, message) {
        state.type = 'error';
        state.message = message;
    },
    clearAlert(state) {
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
