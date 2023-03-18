import { Progression } from '@/modules/progressions'

export default {
	clearUserProgressionEditionAssignedParameters(state) {
		state.editionUserProgression.assignedParameters = {};
	},

	editUserProgressionEditionAssignedParameterValue(state, { parameterName, value }) {
		// Vue cannot detect property addition or deletion, so we assign the new attribute by replacing the object
		const assignedParameters = state.editionUserProgression.assignedParameters;
		state.editionUserProgression.assignedParameters = Object.assign(
			{}, assignedParameters, { [parameterName]: value }
		);
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
