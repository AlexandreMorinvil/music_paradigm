export default {
	curriculumTitle: (state) => {
		return state.sessionInformation.curriculumTitle || null;
	},

	curriculumId: (state) => {
		return state.sessionInformation.curriculumId || null;
	},

	progressionId: (state) => {
		return state.sessionInformation.progressionId || null;
	},

	associativeId: (state) => {
		return state.sessionInformation.associativeId || null;
	},

	sessionExperiment: (state) => {
		return state.sessionInformation.experiment || null;
	},

	sessionCursor: (state) => {
		return state.sessionInformation.previousCursor || null;
	},

	sessionState: (state) => {
		return state.sessionInformation.previousState || null;
	},

	preSessionMessage: (state) => {
		return state.sessionInformation.text || '';
	},

	hasSessionLoaded: (state) => {
		return Boolean(state.sessionInformation.experiment);
	},

	needsMessagePreSession: (state) => {
		return Boolean(state.sessionInformation.text);
	},

	needsPianoSettingPreExperiment: (state) => {
		return state.sessionInformation.experiment.controlType === 'piano';
	},
};
