export default {
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
