// Survey parameters
export default {
	surveyInputOptionsValues: (state) => {
		return state.state.optionsContent.surveyInputOptionsValues;
	},

	surveyInputOptionsText: (state) => {
		return state.state.optionsContent.surveyInputOptionsValues;
	},

	surveyLeftSideText: (state) => {
		return state.state.optionsContent.surveyLeftSideText;
	},

	surveyRightSideText: (state) => {
		return state.state.optionsContent.surveyRightSideText;
	},

	surveyOptionsAreRadio: (state) => {
		return state.state.settings.surveyOptionsAreRadio;
	},

	surveyAreAnswersMandatory: (state) => {
		return state.state.settings.surveyAreAnswersMandatory;
	},
};
