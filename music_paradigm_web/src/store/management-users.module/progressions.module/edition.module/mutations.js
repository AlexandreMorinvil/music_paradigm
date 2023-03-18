import { Progression } from '@/modules/progressions'

export default {
	clearUserProgressionEditionAssignedParameters(state) {
		state.editionUserProgression.assignedParameters = {};
	},

	editUserProgressionEditionAssignedParameterValue(state, { parameterName, value }) {
		state.editionUserProgression.assignedParameters[parameterName] = value;
	},

	editUserProgressionEditionCurriculumReference(state, curriculumId) {
		state.editionUserProgression.curriculumReference = curriculumId || null;
	},

	setUserProgressionEdition(state, progression) {
		state.editionUserProgression = new Progression(progression);
	},

	unsetUserProgressionEdition(state) {
		state.editionUserProgression = new Progression();
	},
};
