// Cue state parameters
export default {
	cueWaitForClick: (state) => {
		return state.settings.cueWaitForClick;
	},

	cuePresentationDelay: (state) => {
		return state.state.settings.cuePresentationDelay;
	},
};
