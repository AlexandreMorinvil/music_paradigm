export default {
	curriculumSummariesList: (state) => {
		return state.curriculumSummariesManager.curriculumSummariesList;
	},

	curriculumSummariesManager: (state) => {
		return state.curriculumSummariesManager;
	},

	isFetchingCurriculumSummariesList: (state) => {
		return state.status.isFetchingCurriculumSummariesList;
	},
};
