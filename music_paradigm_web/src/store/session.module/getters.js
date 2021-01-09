export default {
	associativeId: (state) => {
		// FIXME: Associative is not written properly
		return state.sessionInformation.assosiativeId || null;
	},

	sessionExperiment: (state) => {
		return state.sessionInformation.experiment || null;
	},

	sessionCursor: (state) => {
		return state.sessionInformation.cursor || null;
	},

	preSessionMessage: (state) => {
		return state.sessionInformation.text;
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
