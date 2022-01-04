export default {
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
