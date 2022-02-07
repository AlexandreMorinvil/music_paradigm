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

	associativeIdOrdinalNumber: (state) => {
		return state.sessionInformation.associativeIdOrdinalNumber || 0;
	},

	startCount: (state) => {
		return state.sessionInformation.startCount || 1;
	},

	completionCount: (state) => {
		return state.sessionInformation.completionCount || 0;
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

	sessionInitialTime: (state) => {
		return state.sessionInformation.previousTimeIndicated || 0;
	},

	assignedParameters: (state) => {
		return state.sessionInformation.assignedParameters || {};
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

	needsSoundTestPreExperiment: (state) => {
		return Boolean(state.sessionInformation.experiment.hasSound);
	},

	logType: (state) => {
		return state.sessionInformation.logType;
	},

	tags: (state) => {
		return state.sessionInformation.tags;
	}
};
