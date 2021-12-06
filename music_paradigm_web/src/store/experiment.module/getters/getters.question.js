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

	answerChoicesValue: (state) => {
		return state.state.optionsContent.answerChoicesValue;
	},

	answerChoicesText: (state) => {
		return state.state.optionsContent.answerChoicesText;
	},

	answerChoicesImage: (state) => {
		return state.state.optionsContent.answerChoicesImage;
	},
};
