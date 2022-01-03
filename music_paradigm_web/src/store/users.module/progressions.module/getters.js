export default {
	// Progression parameters
	userSelectedProgressionId: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression._id : null;
	},

	userSelectedImposedParameters: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.assignedParameters : {};
	},

	userSelectedAdjustmentStartTimeInDays: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.adjustmentStartTimeInDays : 0;
	},

	userSelectedStartTime: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.startTime : null;
	},

	userSelectedStartTimePassed: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.startTimePassed : 0;
	},

	userSelectedLastProgressionDate: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.lastProgressionDate : null;
	},

	userSelectedLastProgressionTimePassed: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.lastProgessionTimePassed : 0;
	},

	// Selected session
	selectedSessionAssociativeId: (state) => {
		return state.selectedSessionAssociativeId || null;
	},

	selectedSessionAssociativeIdOrdinalNumber: (state) => {
		return state.selectedSessionAssociativeIdOrdinalNumber || null;
	},

	selectedSession: (state) => {
		return state.selectedUserProgressionHistory.find((session) => state.selectedSessionAssociativeId == session.associativeId
			&& state.selectedSessionAssociativeIdOrdinalNumber == session.associativeIdOrdinalNumber) || {};
	},

	selectedCompletionCount: (state) => {
		return state.selectedCompletionCount || null;
	},

	// Experiments progression history of the user
	userSelectedProgressionHistory: (state) => {
		return state.selectedUserProgressionHistory;
	},

	userSelectedExperimentMarkers: (state) => {
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
