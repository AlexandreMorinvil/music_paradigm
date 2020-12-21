const state = {
	type: null,
	message: null,
	counter: 0 // Used to observe the apparition of new alerts
};

const getters = {
	hasAlert: (state) => {
		return Boolean(state.type);
	},
	alertCounter: (state) => {
		return state.counter;
	},
	alertType: (state) => {
		return state.type || 'No type';
	},
	alertMessage: (state) => {
		return state.message || 'No message';
	}
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
		state.counter += 1;
	},
	setInformationAlert(state, message) {
		state.type = 'information';
		state.message = message;
		state.counter += 1;
	},
	setWarningAlert(state, message) {
		state.type = 'warning';
		state.message = message;
		state.counter += 1;
	},
	setErrorAlert(state, message) {
		state.type = 'error';
		state.message = message;
		state.counter += 1;
	},
	clearAlert(state) {
		state.type = null;
		state.message = null;
		state.counter += 1;
	}
};

export const alert = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
