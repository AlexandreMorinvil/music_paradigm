import _isEqual from 'lodash/isEqual';
import _isNil from 'lodash/isNil';
import _omitBy from 'lodash/omitBy';

export default {
	hasEditedUserProgressionCurriculum: (_, getters) => {
		return getters.hasEditedUserProgressionCurriculumReference ||
			getters.hasEditedUserProgressionAssignedParameters;
	},

	hasEditedUserProgressionCurriculumReference: (_, getters) => {
		return getters['selection/userProgressionSelectionCurriculumReference'] !==
			getters['edition/userProgressionEditionCurriculumReference'];
	},

	hasEditedUserProgressionAssignedParameters: (_, getters) => {
		return !_isEqual(
			_omitBy(getters['selection/userProgressionSelectionAssignedParameters'], _isNil),
			_omitBy(getters['edition/userProgressionEditionAssignedParameters'], _isNil),
		);
	},

	isAssigningCurriculum: (state) => {
		return state.status.isAssigningCurriculum;
	},

	isAssigningParameters: (state) => {
		return state.status.isAssigningParameters;
	},

	isExecutingUserProgressionCommand: (_, getters) => {
		return getters['sessions/isExecutingProgressionSessionCommand'] ||
			getters.isAssigningCurriculum ||
			getters.isAssigningParameters ||
			getters.isFetchingUserProgression;
	},

	isFetchingUserProgression: (state) => {
		return state.status.isFetchingUserProgression;
	},
};
