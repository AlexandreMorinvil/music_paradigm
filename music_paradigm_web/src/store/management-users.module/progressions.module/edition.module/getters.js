export default {
	existsUserProgressionEditionCurriculumParameters: (_, getters) => {
		return getters.userProgressionEditionCurriculumParameters.length > 0;
	},

	hasUserProgressionEditionCurriculumReference: (_, getters) => {
		return Boolean(getters.userProgressionEditionCurriculumReference);
	},

	userProgressionEditionAssignedParameters: (state) => {
		return state.editionUserProgression.assignedParameters;
	},

	userProgressionEditionCurriculumParameters: (_, getters) => {
		return getters.userProgressionEditionCurriculumSummary ?
			getters.userProgressionEditionCurriculumSummary.parametersList : [];
	},

	userProgressionEditionCurriculumReference: (state) => {
		return state.editionUserProgression.curriculumReference;
	},

	userProgressionEditionCurriculumSummary: (_, getters, __, rootGetters) => {
		const curriculumId = getters.userProgressionEditionCurriculumReference;
		const curriculumSummariesManager = rootGetters['managementCurriculums/curriculumSummariesManager'];
		return curriculumSummariesManager.getCurriculumSummaryById(curriculumId);
	},

	userProgressionEditionAdjustmentStartTimeInDays: (state) => {
		return state.editionUserProgression.adjustmentStartTimeInDays;
	},
};
