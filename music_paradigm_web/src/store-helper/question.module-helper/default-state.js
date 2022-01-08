export default {
	DEFAULT_QUESTION_STATE,
};

function DEFAULT_QUESTION_STATE() {
	return {
		// Amswer information
		questionAnswerIndex: null,
		isQuestionAnswerCorrect: null,

		// Context information
		questionAsked: '',
		questionCorrectAnswerIndex: null,
		questionOptionsValues: [],
		questionOptionsTexts: [],
		questionRelatedContent: [],
	};
}
