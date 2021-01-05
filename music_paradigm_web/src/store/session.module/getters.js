export default {
	sessionExperiment: (state) => {
		return state.sessionInformation.experiment || null;
	},

	sessionCursor: (state) => {
		return state.sessionInformation.cursor || null;
	},

	needsMessagePreSession: (state) => {
		return Boolean(state.sessionInformation.text);
	},

	needsPianoSettingPreExperiment: (state) => {
		return state.sessionInformation.experiment.controlType === 'piano';
	},

	receivedPreSessionMessage: (state) => {
		return state.presSessionState.hasHadMessage;
	},

	receivedPreSessionAdvice: (state) => {
		return state.presSessionState.hasHadAdvice;
	},

	receivedPreSessionPianoSetting: (state) => {
		return state.presSessionState.hasHadPiano;
	},
};
