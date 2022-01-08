export default {
	DEFAULT_QUESTION_STATE,
};

function DEFAULT_QUESTION_STATE() {
	return {
		questionAnswer: null,

		questionCorrectAnswerIndex: null,
		questionOptionsValues: [],
		questionOptionsTexts: [],
		questionAsked: '',
		questionRelatedContent: [],
	};
}
