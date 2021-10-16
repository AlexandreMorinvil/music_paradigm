export default {
	setWittenInputContext: ({ commit }, context) => {
		commit('setWittenInputContext', context);
	},

	setWittenInputAnswer: ({ commit }, answer) => {
		commit('setWittenInputAnswer', answer);
	},

	resetWittenInput: ({ commit }, answer) => {
		commit('resetWittenInput', answer);
	},
};
