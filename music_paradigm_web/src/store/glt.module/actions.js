export default {
	recordMatrixSetup: ({ commit }, setupUp) => {
		commit('setMatrixSetup', setupUp);
	},

	recordGridLocationTaksAnswers: ({ commit }, answers) => {
		commit('recordGridLocationTaksAnswers', answers);
	},

	resetGridLocationTaskRecords: ({ commit }) => {
		commit('resetGridLocationTaskRecords');
	},
};
