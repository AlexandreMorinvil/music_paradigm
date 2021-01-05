export default {
	sessionExperiment: (state) => {
		return state.sessionInformation.experiment || null;
	},

	sessionCursor: (state) => {
		return state.sessionInformation.cursor || null;
	},

	hasPresessionText: (state) => {
		return Boolean(state.sessionInformation.text);
	},
};
