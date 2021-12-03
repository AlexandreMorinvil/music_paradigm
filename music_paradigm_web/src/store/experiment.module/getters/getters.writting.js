// Free text answer state parameters
export default {
	writtingMaxCharacters: (state) => {
		return state.state.settings.writtingMaxCharacters;
	},

	writtingMinCharacters: (state) => {
		return state.state.settings.writtingMinCharacters;
	},

	writtingIsNumber: (state) => {
		return state.state.settings.writtingIsNumber;
	},

	writtingIsMultiline: (state) => {
		return state.state.settings.writtingIsMultiline;
	},

	writtingTextPlaceHolder: (state) => {
		return state.state.settings.writtingTextPlaceHolder;
	},
};
