import { Progression } from '@/modules/progressions'

export default {
	editUserProgressionEditionCurriculumReference(state, curriculumId) {
		state.editionUserProgression.curriculumReference = curriculumId;
	},

	setUserProgressionEdition(state, progression) {
		state.editionUserProgression = new Progression(progression);
	},

	unsetUserProgressionEdition(state) {
		state.editionUserProgression = new Progression();
	},
};
