export default {
	curriculumSelectionCurriculum: (state) => {
		return state.selectionCurriculum;	
	},

	curriculumSelectionId: (state) => {
		return state.selectionCurriculum._id;
	},

	curriculumSelectionTitle: (state) => {
		return state.selectionCurriculum.title;
	},

	curriculumSelectionLogType: (state) => {
		return state.selectionCurriculum.logType;
	},

	curriculumSelectionIsSequential: (state) => {
		return state.selectionCurriculum.isSequential;
	},

	curriculumSelectionCurriculumTasks: (state) => {
		return state.selectionCurriculum.experiments;
	},

	hasSelectedCurriculum: (state) => {
		return Boolean(state.selectionCurriculum._id);
	},
};
