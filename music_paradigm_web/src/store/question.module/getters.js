export default {
	questionAnswerIndex: (state) => {
		return state.questionAnswerIndex;
	},

	isQuestionAnswerCorrect: (state) => {
		return state.isQuestionAnswerCorrect;
	},

	questionCorrectAnswerIndex: (state) => {
		return state.questionCorrectAnswerIndex;
	},

	questionOptionsValues: (state) => {
		return state.questionOptionsValues;
	},

	questionOptionsTexts: (state) => {
		return state.questionOptionsTexts;
	},

	questionAsked: (state) => {
		return state.questionAsked;
	},

	questionRelatedContent: (state) => {
		return state.questionRelatedContent;
	},
};
