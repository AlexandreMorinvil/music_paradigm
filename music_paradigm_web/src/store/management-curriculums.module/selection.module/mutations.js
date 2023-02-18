import { curriculumGenerator } from '@/modules/curriculums';

export default {
	setCurriculumSelection(state, curriculum) {
		state.selectionCurriculum = curriculum;
	},

	unsetCurriculumSelection(state) {
		state.selectionCurriculum = curriculumGenerator.GENERATE_BLANK_CURRICULUM();
	},
};