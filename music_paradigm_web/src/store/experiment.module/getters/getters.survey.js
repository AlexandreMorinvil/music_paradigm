// Survey parameters
export default {
	surveyInputOptionsValues: (state) => {
		return state.state.content.surveyInputOptionsValues;
	},

	surveyInputOptionsText: (state) => {
		return state.state.content.surveyInputOptionsText;
	},

	surveyLeftSideText: (state) => {
		return state.state.content.surveyLeftSideText;
	},

	surveyRightSideText: (state) => {
		return state.state.content.surveyRightSideText;
	},

	surveyOptionsAreRadio: (state) => {
		return state.state.settings.surveyOptionsAreRadio;
	},

	surveyAreAnswersMandatory: (state) => {
		return state.state.settings.surveyAreAnswersMandatory;
	},
};
