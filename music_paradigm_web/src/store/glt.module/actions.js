export default {
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
