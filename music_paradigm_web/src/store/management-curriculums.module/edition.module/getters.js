export default {
	curriculumEditionCurriculum: (state) => {
		return state.editionCurriculum;
	},

	curriculumEditionCurriculumTasksList: (state) => {
		return state.editionCurriculum.experiments;
	},

	curriculumEditionIsSequential: (state) => {
		return state.editionCurriculum.isSequential;
	},

	curriculumEditionLogType: (state) => {
		return state.editionCurriculum.logType;
	},

	curriculumEditionSelectedSessionIndex: (state) => {
		return state.selectedSessionIndex;
	},

	curriculumEditionSessionAssociativeId(state) {
		return state.editionCurriculum.experiments[state.selectedSessionIndex].associativeId;
	},

	curriculumEditionSessionDelayInDays(state) {
		return state.editionCurriculum.experiments[state.selectedSessionIndex].delayInDays;
	},

	curriculumEditionSessionIsCompletionLimited(state) {
		return state.editionCurriculum.experiments[state.selectedSessionIndex].isCompletionLimited;
	},

	curriculumEditionSessionIsUniqueInDay(state) {
		return state.editionCurriculum.experiments[state.selectedSessionIndex].isUniqueInDay;
	},

	curriculumEditionSessionTaskReference(state) {
		return state.editionCurriculum.experiments[state.selectedSessionIndex].experimentReference;
	},

	curriculumEditionSessionTitle(state) {
		return state.editionCurriculum.experiments[state.selectedSessionIndex].title;
	},

	curriculumEditionSessionText(state) {
		return state.editionCurriculum.experiments[state.selectedSessionIndex].text;
	},

	curriculumEditionTitle: (state) => {
		return state.editionCurriculum.title;
	},

	hasCurriculumEditionSelectedSession: (state) => {
		return state.selectedSessionIndex >= 0 && state.editionCurriculum.experiments.length > state.selectedSessionIndex;
	},
};
