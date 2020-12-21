import{ resultService } from'../_services';

const state = {
	result: {}
};

const actions = {
	create({ commit }, result) {
		commit('createRequest', result);

		resultService.create(result)
			.then(
				(result) => {
					commit('createSuccess', result);
				},
				(error) => {
					commit('createFailure', error);
					console.error(`Results log fail: ${error}`);
				}
			);
	}
};

const mutations = {
	createRequest(state) {
		state.status = { creating: true };
	},
	createSuccess(state) {
		state.status = {};
	},
	createFailure(state) {
		state.status = {};
	}
};

export const results = {
	namespaced: true,
	state,
	actions,
	mutations
};
