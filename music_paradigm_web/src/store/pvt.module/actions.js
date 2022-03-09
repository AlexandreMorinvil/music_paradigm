export default {
	setPvtResults: ({ commit }, result) => {
		commit('setPvtResults', result);
	},

	setPvtContext: ({ commit }, context) => {
		commit('setPvtContext', context);
	},

	resetPvtState: ({ commit }) => {
		commit('resetPvtState');
	},
};
