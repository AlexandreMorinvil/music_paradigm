export default {
	curriculumSummariesList: (state) => {
		return state.curriculumSummariesManager.curriculumSummariesList;
	},

	curriculumSummariesManager: (state) => {
		return state.curriculumSummariesManager;
	},
	
	// TODO: Delete once the code will have been adjusted
	curriculumsList: (state) => {
		return state.curriculumSummariesManager.curriculumSummariesList;
	},

	isFetchingCurriculumsList: (state) => {
		return state.status.isFetchingCurriculumsList;
	},
};
