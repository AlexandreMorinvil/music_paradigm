export default {
	curriculumSummariesList: (state) => {
		return state.curriculumSummariesList;
	},

	// TODO: Delete once the code will have been adjusted
	curriculumsList: (state) => {
		return state.curriculumSummariesList;
	},

	isFetchingCurriculumsList: (state) => {
		return state.status.isFetchingCurriculumsList;
	},
};
