export default {
	clearState: ({ commit }) => {
		commit('clearState');
	},
	setExperiment: ({ commit }, experiment) => {
		commit('setExperiment', experiment);
	},
	setStartingPoint: ({ commit }, cursor = null) => {
		commit('initCursor', cursor);
	},
	initExperiment: ({ commit }) => {
		commit('initExperiment');
	},
	updateState: ({ commit }) => {
		commit('updateState');
	},
	goNextStep: ({ commit }) => {
		commit('moveNextStep');
	},
	goStepPostSkip: ({ commit }) => {
		commit('movePostSkip');
	},
	endExperimentByTimeout: ({ commit }) => {
		commit('endExperimentByTimeout');
	},
	concludeExperiment: ({ commit }) => {
		commit('leaveExperiment');
	},

	// Record methods
	addSuccess: ({ commit }) => {
		commit('addSuccess');
	},
};
