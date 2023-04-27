export default {
	curriculumSelection: (state) => {
		return state.selectionCurriculum;	
	},

	curriculumSelectionId: (_, getters) => {
		return getters.curriculumSelection._id;
	},

	curriculumSelectionTitle: (_, getters) => {
		return getters.curriculumSelection.title;
	},

	curriculumSelectionIsSequential: (_, getters) => {
		return getters.curriculumSelection.isSequential;
	},

	curriculumSelectionCurriculumTasks: (_, getters) => {
		return getters.curriculumSelection.experiments;
	},

	hasSelectedCurriculum: (_, getters) => {
		return Boolean(getters.curriculumSelection._id);
	},
};
