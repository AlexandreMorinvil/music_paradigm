// Question state parameters
export default {
	questionType: (state) => {
		return state.state.settings.questionType;
	},

	areAnswerOptionsVertical: (state) => {
		return state.state.settings.areAnswerOptionsVertical;
	},

	areInactiveAnswersDisplayed: (state) => {
		return state.state.settings.areInactiveAnswersDisplayed;
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

	answerChoicesColor: (state) => {
		return state.state.optionsContent.answerChoicesColor;
	},

	answerChoicesImage: (state) => {
		return state.state.optionsContent.answerChoicesImage.map(imageName => {
			return imageName ? `${state.description.folder}/${imageName}` : '';
		});
	},

	questionMustConfirmAnswer: (state) => {
		return state.state.settings.questionMustConfirmAnswer;
	},

	questionCanSubmitBlankAnswer: (state) => {
		return state.state.settings.questionCanSubmitBlankAnswer;
	},

	questionSubmitAnswerButtonText: (state) => {
		return state.state.settings.questionSubmitAnswerButtonText;
	},

	questionBlankAnswerButtonText: (state) => {
		return state.state.settings.questionBlankAnswerButtonText;
	},

	rightAnswers: (state) => {
		return state.state.optionsContent.rightAnswers;
	}
};
