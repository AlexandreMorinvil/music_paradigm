import { defaultState } from '@/store-helper/survey.module-helper';

export default {
	setSurveyContext: (state, context) => {
		state.isSurveyRadio = context.isSurveyRadio;
		state.surveyOptions = context.surveyOptions;
		state.surveyHeader = context.surveyHeader;
		state.surveySideText = context.surveySideText;
	},

	setSurveyAnswers: (state, answers) => {
		state.surveyAnswers = answers;
	},

	resetSurvey: (state) => {
		Object.assign(state, defaultState.DEFAULT_SURVEY_STATE());
	},
};
