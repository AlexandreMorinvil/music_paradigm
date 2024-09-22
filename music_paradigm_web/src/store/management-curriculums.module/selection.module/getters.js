export default {
	curriculumSelection: (state) => {
		return state.selectionCurriculum;
	},

	curriculumSelectionId: (state) => {
		return state.selectionCurriculum._id;
	},

	curriculumSelectionTitle: (state) => {
		return state.selectionCurriculum.title;
	},

	curriculumSelectionIsSequential: (state) => {
		return state.selectionCurriculum.isSequential;
	},

	curriculumSelectionUsesCdn: (state) => {
		return state.selectionCurriculum.usesCdn;
	},

	curriculumSelectionCdnUrl: (state) => {
		return state.selectionCurriculum.cdnUrl;
	},

	curriculumSelectionCurriculumTasks: (state) => {
		return state.selectionCurriculum.experiments;
	},

	hasSelectedCurriculum: (state) => {
		return Boolean(state.selectionCurriculum._id);
	},
};
