// Getters for the experiment flow's information
export default {
	currentFlow: (state) => {
		return state.flow;
	},

	mainFlow: (state) => {
		return state.mainFlow;
	},

	preludeFlow: (state) => {
		return state.flowPrelude;
	},
};
