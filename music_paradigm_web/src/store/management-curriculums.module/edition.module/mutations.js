import { Curriculum, curriculumSessionsEditor } from '@/modules/curriculums';

export default {
	activateCurriculumEditionSessionAdditionMode(state) {
		state.isInCurriculumEditionSessionAdditionMode = true;
	},

	activateCurriculumEditionSessionMoveMode(state) {
		state.isInCurriculumEditionSessionMoveMode = true;
	},

	addCurriculumEditionSession(state, { indexPosition, isAddedBefore }) {
		curriculumSessionsEditor.addCurriculumSessionToList(
			state.editionCurriculum.experiments,
			indexPosition,
			isAddedBefore
		);
	},

	deactivateCurriculumEditionSessionAdditionMode(state) {
		state.isInCurriculumEditionSessionAdditionMode = false;
	},

	deactivateCurriculumEditionSessionMoveMode(state) {
		state.isInCurriculumEditionSessionMoveMode = false;
	},

	editCurriculumEditionIsSequential(state, isSequential) {
		state.editionCurriculum.isSequential = isSequential;
	},

	editCurriculumEditionSessionAssociativeId(state, associativeId) {
		curriculumSessionsEditor.editCurriculumSessionAssociativeId(
			state.editionCurriculum.experiments,
			state.selectedSessionIndex,
			associativeId
		)
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
		curriculumSessionsEditor.editCurriculumSessionTaskReference(
			state.editionCurriculum.experiments,
			state.selectedSessionIndex,
			taskReference
		)
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

	moveCurriculumEditionSession(state, indexTargetPosition) {
		const indexSelectedSessionAdjusted = curriculumSessionsEditor.moveCurriculumSessionInList(
			state.editionCurriculum.experiments,
			state.selectedSessionIndex,
			indexTargetPosition);
		state.selectedSessionIndex = indexSelectedSessionAdjusted;
	},

	removeCurriculumEditionSession(state) {
		curriculumSessionsEditor.removeCurriculumSessionFromList(
			state.editionCurriculum.experiments,
			state.selectedSessionIndex,
		);
	},

	setCurriculumEdition(state, curriculum) {
		state.editionCurriculum = new Curriculum(curriculum);
	},

	setCurriculumEditionSelectedSessionIndex(state, index) {
		state.selectedSessionIndex = index;
	},

	unsetCurriculumEdition(state) {
		state.editionCurriculum = new Curriculum();
	},

	unsetCurriculumEditionSelectedSessionIndex(state) {
		state.selectedSessionIndex = -1;
	},
};
