export default {
	clearState: ({ commit }) => {
		commit('clearState');
	},
	setExperiment: ({ commit }, experiment) => {
		commit('setExperiment', experiment);
	},
	setParameterValues: ({ commit }, variableValues) => {
		commit('setParameterValues', variableValues);
	},
	setStartingPoint: ({ commit }, cursor = null) => {
		commit('initCursor', cursor);
	},
	initExperiment: ({ commit }, initialState = null) => {
		commit('initExperiment', initialState);
	},

	updateState: ({ commit }) => {
		commit('updateState');
	},

	// Prelude actions
	initializePrelude: ({ commit }) => {
		commit('initializePrelude');
		commit('updateState');
	},
	leavePrelude: ({ commit }) => {
		commit('leavePrelude');
		commit('updateState');
	},

	// Cursor handling actions
	goNextStep: ({ commit }) => {
		commit('moveNextStep');
	},
	goPreviousInnerStep: ({ commit }) => {
		commit('movePreviousInnerStep');
	},
	goStepPostSkip: ({ commit }) => {
		commit('movePostSkip');
	},

	// End actions
	endExperimentByTimeout: ({ commit }) => {
		commit('endExperimentByTimeout');
	},
	concludeExperiment: ({ commit }) => {
		commit('leaveExperiment');
	},

	// Record actions
	addSuccess: ({ commit }) => {
		commit('addSuccess');
	},
	stopWaitingStartSignalReady: ({ commit }) => {
		commit('stopWaitingStartSignalReady');
	},
};
