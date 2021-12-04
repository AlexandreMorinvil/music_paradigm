// Getters used for the parameters that are global to the session taking place
export default {
	considerExperimentFinished: (state) => {
		return state.state.record.considerExperimentFinished;
	},
};
