// Question state parameters
export default {
	questionType: (state) => {
		return state.state.settings.questionType;
	},

	textAfterQuestionAsked: (state) => {
		return state.state.content.textAfterQuestionAsked;
	},

	textSpecification: (state) => {
		return state.state.content.textSpecification;
	},

	textReminder: (state) => {
		return state.state.content.textReminder;
	},
};
