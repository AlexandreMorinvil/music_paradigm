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
	initExperiment: ({ commit, dispatch, getters }, initialState = null) => {
		commit('initExperiment', initialState);
		dispatch(
			'resourcesPreloader/initializePreloading',
			{
				folder: getters.baseResourcesFolder,
				flow: getters.mainFlow,
				index: getters.markerCurrentIndex,
				flowPrelude: getters.preludeFlow,
			},
			{ root: true }
		);
	},
	initInitialTime: ({ commit }, initialTime) => {
		commit('initInitialTime', initialTime);
	},
	setCriticalBackup: ({ commit }, { criticalBackup, previousState, previousCursor }) => {
		commit('setCriticalBackup', { criticalBackup, previousState, previousCursor })
	},
	updateCriticalBackup: ({ commit }) => {
		commit('updateCriticalBackup');
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
	goNextStep: ({ commit, dispatch, getters }) => {
		commit('moveNextStep');
		dispatch('resourcesPreloader/updatePreloader', {
			folder: getters.baseResourcesFolder,
			flow: getters.currentFlow,
			index: getters.currentIndex,
			isMainFlow: getters.isInMainFlow,
		}, { root: true });
	},

	goPreviousInnerStep: ({ commit, dispatch, getters }) => {
		commit('movePreviousInnerStep');
		dispatch('resourcesPreloader/updatePreloader', {
			flow: getters.currentFlow,
			index: getters.currentIndex,
			isMainFlow: getters.isInMainFlow,
		}, { root: true });
	},

	goStepPostSkip: ({ commit, dispatch, getters }) => {
		commit('movePostSkip');
		dispatch('resourcesPreloader/updatePreloader', {
			flow: getters.currentFlow,
			index: getters.currentIndex,
			isMainFlow: getters.isInMainFlow,
		}, { root: true });
	},

	// End actions
	leaveExperiment: ({ commit, dispatch }) => {
		commit('leaveExperiment');
		dispatch('resourcesPreloader/reset', undefined, { root: true });
	},

	// Record actions
	addSuccess: ({ commit }) => {
		commit('addSuccess');
	},
	setReferenceSurveyAnswer: ({ commit }, referenceSurveyAnswer) => {
		commit('setReferenceSurveyAnswer', referenceSurveyAnswer);
	},
	stopWaitingStartSignalReady: ({ commit }) => {
		commit('stopWaitingStartSignalReady');
	},
	trackExperimentTimeIndicated: ({ commit }, timeIndicated) => {
		commit('trackExperimentTimeIndicated', timeIndicated);
	},
	setTimesUpStatus: ({ commit, dispatch, getters  }) => {
		commit('setTimesUpStatus');
		dispatch('resourcesPreloader/updatePreloader', {
			flow: getters.currentFlow,
			index: getters.currentIndex,
			isMainFlow: getters.isInMainFlow,
		}, { root: true });
	}
};
