import { curriculumGenerator } from '@/modules/curriculums';

export default {
	editCurriculumEditionLogType(state, logType) {
		state.editionCurriculum.logType = logType;
	},
	
	editCurriculumEditionIsSequential(state, isSequential) {
		state.editionCurriculum.isSequential = isSequential;
	},
	
	editCurriculumEditionCurriculumTasks(state, tasks) {
		state.editionCurriculum.experiments = tasks;
	},

	editCurriculumEditionSessionAssociativeId(state, associativeId) {
		state.editionCurriculum.experiments[state.selectedSessionIndex].associativeId = associativeId;
	},

	editCurriculumEditionSessionDelayInDays(state, delayInDays) {
		state.editionCurriculum.experiments[state.selectedSessionIndex].delayInDays = delayInDays;
	},

	editCurriculumEditionSessionIsCompletionLimited(state, isCompletionLimited) {
		state.editionCurriculum.experiments[state.selectedSessionIndex].isCompletionLimited = isCompletionLimited;
	},

	editCurriculumEditionSessionIsUniqueInDay(state, isUniqueInDay) {
		state.editionCurriculum.experiments[state.selectedSessionIndex].isUniqueInDay = isUniqueInDay;
	},

	editCurriculumEditionSessionTaskReference(state, taskReference) {
		state.editionCurriculum.experiments[state.selectedSessionIndex].experimentReference = taskReference;
	},

	editCurriculumEditionSessionTitle(state, title) {
		state.editionCurriculum.experiments[state.selectedSessionIndex].title = title;
	},

	editCurriculumEditionSessionText(state, text) {
		state.editionCurriculum.experiments[state.selectedSessionIndex].text = text;
	},
	
	editCurriculumEditionTitle(state, title) {
		state.editionCurriculum.title = title;
	},
	
	setCurriculumEdition(state, curriculum) {
		state.editionCurriculum = JSON.parse(JSON.stringify(curriculum));
		delete state.editionCurriculum._id;
	},
	
	setCurriculumEditionSelectedSessionIndex(state, index) {
		state.selectedSessionIndex = index;
	},

	unsetCurriculumEdition(state) {
		state.editionCurriculum = curriculumGenerator.GENERATE_BLANK_CURRICULUM();
	},

	unsetCurriculumEditionSelectedSessionIndex(state) {
		state.selectedSessionIndex = -1;
	},
};
