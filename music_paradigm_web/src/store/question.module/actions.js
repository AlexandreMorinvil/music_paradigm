export default {
	setQuestionContext: ({ commit }, context) => {
		commit('setQuestionContext', context);
	},

	setQuestionAnswers: ({ commit }, answers) => {
		commit('setQuestionAnswers', answers);
	},

	resetQuestion: ({ commit }) => {
		commit('resetQuestion');
	},
};
