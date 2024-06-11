export default {
	setSurveyContext: ({ commit }, context) => {
		commit('setSurveyContext', context);
	},

	setSurveyAnswers: ({ commit }, answers) => {
		commit('setSurveyAnswers', answers);
	},

	setReferenceSurveyAnswer: ({ dispatch }, answer) => {
		dispatch('experiment/setReferenceSurveyAnswer', answer, { root: true });
	},

	resetSurvey: ({ commit }) => {
		commit('resetSurvey');
	},
};
