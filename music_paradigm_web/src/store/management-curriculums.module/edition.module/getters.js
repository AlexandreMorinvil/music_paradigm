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
		const curriculumEditionSession = state.editionCurriculum.experiments[state.selectedSessionIndex] || {};
		return curriculumEditionSession.associativeId;
	},

	curriculumEditionSessionDelayInDays(state) {
		const curriculumEditionSession = state.editionCurriculum.experiments[state.selectedSessionIndex] || {};
		return curriculumEditionSession.delayInDays;
	},

	curriculumEditionSessionIsCompletionLimited(state) {
		const curriculumEditionSession = state.editionCurriculum.experiments[state.selectedSessionIndex] || {};
		return curriculumEditionSession.isCompletionLimited;
	},

	curriculumEditionSessionIsUniqueInDay(state) {
		const curriculumEditionSession = state.editionCurriculum.experiments[state.selectedSessionIndex] || {};
		return curriculumEditionSession.isUniqueInDay;
	},

	curriculumEditionSessionTaskReference(state) {
		const curriculumEditionSession = state.editionCurriculum.experiments[state.selectedSessionIndex] || {};
		return curriculumEditionSession.experimentReference;
	},

	curriculumEditionSessionTitle(state) {
		const curriculumEditionSession = state.editionCurriculum.experiments[state.selectedSessionIndex] || {};
		return curriculumEditionSession.title;
	},

	curriculumEditionSessionText(state) {
		const curriculumEditionSession = state.editionCurriculum.experiments[state.selectedSessionIndex] || {};
		return curriculumEditionSession.text;
	},

	curriculumEditionTitle: (state) => {
		return state.editionCurriculum.title;
	},
	
	hasCurriculumEditionSelectedSession: (state) => {
		return state.selectedSessionIndex >= 0 && state.editionCurriculum.experiments.length > state.selectedSessionIndex;
	},

	hasMoreThanOneSessionInCurriculumEdition: (state) => {
		return state.editionCurriculum.experiments.length > 1;
	},

	isInCurriculumEditionSessionAdditionMode: (state) => {
		return state.isInCurriculumEditionSessionAdditionMode;
	},

	needsCurriculumEditionSessionPositionMakers: (_, getters) => {
		return getters.isInCurriculumEditionSessionAdditionMode;
	},
};