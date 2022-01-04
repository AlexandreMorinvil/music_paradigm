export default {
	setSurveyContext: ({ commit }, context) => {
		commit('setSurveyContext', context);
	},

	setSurveyAnswers: ({ commit }, answers) => {
		commit('setSurveyAnswers', answers);
	},

	resetSurvey: ({ commit }) => {
		commit('resetSurvey');
	},
};
