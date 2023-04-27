export default {
	indicateFetchingCurriculumList(state) {
		state.status.isFetchingCurriculumSummariesList = true;
	},

	indicateCreatingCurriculum(state, isActive) {
		state.status.isCreatingCurriculum = isActive;
	},

	indicateFetchingCurriculumSummariesList(state, isActive) {
		state.status.isFetchingCurriculumSummariesList = isActive;
	},

	indicateDeletingCurriculum(state, isActive) {
		state.status.isDeletingCurriculum = isActive;
	},

	indicateUpdatingCurriculum(state, isActive) {
		state.status.isUpdatingCurriculum = isActive;
	},

	setCurriculumSummariesList(state, curriculumSummariesList) {
		state.curriculumSummariesManager.setCurriculumSummariesList(curriculumSummariesList);
	},
};
