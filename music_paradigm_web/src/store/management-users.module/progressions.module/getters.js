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

	// TODO: All the getters below need to be adjusted/deleted once the code will have been adjusted
	// Progression parameters
	progressionSelectedId: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression._id : null;
	},

	progressionSelectedImposedParameters: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.assignedParameters : {};
	},

	progressionSelectedAdjustmentStartTimeInDays: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.adjustmentStartTimeInDays : 0;
	},

	progressionSelectedStartTime: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.startTime : null;
	},

	progressionSelectedStartTimePassed: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.startTimePassed : 0;
	},

	progressionSelectedLastProgressionDate: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.lastProgressionDate : null;
	},

	progressionSelectedLastProgressionTimePassed: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.lastProgessionTimePassed : 0;
	},

	progressionSelectedDuration: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.duration : 0;
	},

	// Selected session
	sessionSelectedAssociativeId: (state) => {
		return state.selectedSessionAssociativeId;
	},

	sessionSelectedAssociativeIdOrdinalNumber: (state) => {
		return state.selectedSessionAssociativeIdOrdinalNumber;
	},

	sessionSelected: (state) => {
		return state.selectedUserProgressionHistory.find((session) => state.selectedSessionAssociativeId == session.associativeId
			&& state.selectedSessionAssociativeIdOrdinalNumber == session.associativeIdOrdinalNumber) || {};
	},

	sessionCompletionCountSelected: (state) => {
		return state.selectedCompletionCount;
	},

	// Experiments progression history of the user
	progressionSelectedHistory: (state) => {
		return state.selectedUserProgressionHistory;
	},

	progressionSelectedExperimentMarkers: (state) => {
		return state.selectedUserExperimentMarkers;
	},

	// Status
	hasProgressionHistory: (state) => {
		return Boolean(state.selectedUserProgressionHistory.length);
	},

	hasSelectedProgressionSession: (state) => {
		return Boolean(state.selectedUserProgressionHistory.length) && state.selectedSessionAssociativeId !== null;
	},

	hasSelectedSessionCompletionCount: (state) => {
		return state.selectedCompletionCount !== null;
	}
};
