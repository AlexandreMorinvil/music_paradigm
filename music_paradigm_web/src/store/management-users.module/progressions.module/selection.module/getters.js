export default {
	hasSelectedUserProgression: (_, getters) => {
		return Boolean(getters.userProgressionSelectionId);
	},

	hasUserProgressionSelectionCurriculumReference: (_, getters) => {
		return Boolean(getters.userProgressionSelectionCurriculumReference);
	},

	userProgressionSelectionAssignedParameters: (state) => {
		return state.selectionUserProgression.assignedParameters;
	},

	userProgressionSelectionCurriculumParameters: (getters) => {
		return getters.userProgressionSelectionCurriculumSummary ? 
			getters.userProgressionSelectionCurriculumSummary.parametersList : [];
	},

	userProgressionSelectionCurriculumReference: (state) => {
		return state.selectionUserProgression.curriculumReference;
	},

	userProgressionSelectionCurriculumSummary: (_, getters, __, rootGetters) => {
		const curriculumId = getters.userProgressionSelectionCurriculumReference;
		const curriculumSummariesManager = rootGetters['managementCurriculums/curriculumSummariesManager'];
		return curriculumSummariesManager.getCurriculumSummaryById(curriculumId);
	},

	userProgressionSelectionId: (state) => {
		return state.selectionUserProgression._id;
	},
};
