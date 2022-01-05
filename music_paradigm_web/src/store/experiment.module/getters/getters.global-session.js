// Getters used for the parameters that are global to the session taking place
export default {
	isInTimeUp: (state) => {
		return state.state.record.isInTimeUp;
	},
	considerExperimentFinished: (state) => {
		return state.state.record.considerExperimentFinished;
	},
};
