export default {
	hasUserProgressionEditionCurriculumReference: (state) => {
		return state.editionUserProgression.curriculumReference !== null;
	},

	userProgressionEditionCurriculumReference: (state) => {
		return state.editionUserProgression.curriculumReference;
	},

	userProgressionEditionAdjustmentStartTimeInDays: (state) => {
		return state.editionUserProgression.adjustmentStartTimeInDays;
	},

	userProgressionEditionAssignedParameters: (state) => {
		return state.editionUserProgression.assignedParameters;
	},
};
