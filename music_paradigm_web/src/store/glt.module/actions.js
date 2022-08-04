export default {
	evaluateGlt: ({ dispatch, getters, rootGetters }) => {
		dispatch('evaluation/evaluateGltType', {
			rightAnswersCount: getters.rightAnswersCount,
			interrogationsCount: getters.interrogationsCount,
			successThreshold: rootGetters['experiment/gltScoreForSuccess'],
		}, { root: true });
	},

	recordGltParameters: ({ commit }, parameters) => {
		commit('recordGltParameters', parameters);
	},

	recordMatrixSetup: ({ commit }, setupUp) => {
		commit('recordMatrixSetup', setupUp);
	},

	recordGltResults: ({ commit }, answers) => {
		commit('recordGltResults', answers);
	},

	resetGltRecords: ({ commit }) => {
		commit('resetGridLocationTaskRecords');
	},
};
