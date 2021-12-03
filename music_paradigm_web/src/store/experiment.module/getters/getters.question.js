// Question state parameters
export default {
	textAfterQuestionAsked: (state) => {
		return state.state.content.textAfterQuestionAsked;
	},

	textSpecification: (state) => {
		return state.state.content.textSpecification;
	},

	textReminder: (state) => {
		return state.state.content.textReminder;
	},
};
