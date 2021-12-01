export default {
	DEFAULT_SURVEY_STATE,
};

function DEFAULT_SURVEY_STATE() {
	return {
		surveyAnswers: [],
		isSurveyRadio: true,
		surveyOptions: [],
		surveyHeader: [],
		surveySideText: [],
	};
}
