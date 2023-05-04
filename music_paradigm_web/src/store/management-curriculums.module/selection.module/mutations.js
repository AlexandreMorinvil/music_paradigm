import { Curriculum } from '@/modules/curriculums';

export default {
	setCurriculumSelection(state, curriculum) {
		state.selectionCurriculum = new Curriculum(curriculum);
	},

	unsetCurriculumSelection(state) {
		state.selectionCurriculum = new Curriculum();
	},
};