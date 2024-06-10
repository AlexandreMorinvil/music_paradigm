// Cue state parameters
export default {
	cueWaitForClick: (state) => {
		return state.settings.cueWaitForClick;
	},

	cuePresentationDelay: (state) => {
		return state.state.settings.cuePresentationDelay;
	},

	cueMelodyProportionalDelayAfter: (state) => {
		return state.state.settings.cueMelodyProportionalDelayAfter;
	},

	cueAdditionalDelayAfter: (state) => {
		return state.state.settings.cueAdditionalDelayAfter;
	},

	cueEnablePianoAfterCue: (state) => {
		return state.state.settings.cueEnablePianoAfterCue;
	}
};
