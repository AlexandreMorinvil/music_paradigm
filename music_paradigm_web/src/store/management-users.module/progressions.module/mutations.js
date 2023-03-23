export default {
	indicateAssigningCurriculum(state, isActive) {
		state.status.isAssigningCurriculum = isActive;
	},

	indicateAssigningParameters(state, isActive) {
		state.status.isAssigningParameters = isActive;
	},

	indicateFetchingUserProgression(state, isActive) {
		state.status.isFetchingUserProgression = isActive;
	},
};
