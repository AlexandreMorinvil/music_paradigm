export default {
	clearState: ({ commit }) => {
		commit('clearState');
	},

	// Actions to start an experiment
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
	initInitialTime: ({ commit }, initialTime) => {
		commit('initInitialTime', initialTime);
	},
	updateState: ({ commit }) => {
		commit('updateState');
	},

	// Prelude actions
	initializePrelude: ({ commit }) => {
		commit('initializePrelude');
	},

	// Conclusion actions
	endExperimentByTimeUp: ({ commit }) => {
		commit('endExperimentByTimeUp');
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
	leaveExperiment: ({ commit }) => {
		commit('leaveExperiment');
	},

	// Record actions
	addSuccess: ({ commit }) => {
		commit('addSuccess');
	},
	stopWaitingStartSignalReady: ({ commit }) => {
		commit('stopWaitingStartSignalReady');
	},
	trackExperimentTimeIndicated: ({ commit }, timeIndicated) => {
		commit('trackExperimentTimeIndicated', timeIndicated);
	},
};
