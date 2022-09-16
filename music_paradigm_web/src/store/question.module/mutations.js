import { answerHandler, defaultState } from '@/store-helper/question.module-helper';

export default {
	setQuestionContext: (state, context) => {
		state.questionCorrectAnswerIndex = context.questionCorrectAnswerIndex;
		state.questionAsked = context.questionAsked;
		state.questionOptionsValues = context.questionOptionsValues;
		state.questionOptionsTexts = context.questionOptionsTexts;
		state.questionRelatedContent = context.questionRelatedContent;
	},

	setQuestionAnswers: (state, answerIndex = null) => {
		state.questionAnswerIndex = answerIndex;
		state.isQuestionAnswerCorrect = answerHandler.getAnswerCorrectness(state.questionCorrectAnswerIndex, state.questionAnswerIndex);
	},

	resetQuestion: (state) => {
		Object.assign(state, defaultState.DEFAULT_QUESTION_STATE());
	},
};
