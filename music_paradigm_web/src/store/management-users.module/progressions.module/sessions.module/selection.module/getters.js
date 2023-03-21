import { ProgressionSessionDetailed, ProgressionSessionIdentifier } from "@/modules/progressions";

export default {
	hasSelectedProgressionSession: (_, getters) => {
		return Boolean(getters.progressionSessionSelection.associativeId);
	},

	hasProgressionSessionSelectionTaskStateMarker: (_, getters) => {
		return Boolean(getters.progressionSessionSelectionTaskStateMarker.associativeId);
	},

	progressionSessionSelection: (state, _, __, rootGetters) => {
		// We retreive the selected session directly from the list loaded
		const sessionsList = rootGetters['managementUsers/progressions/sessions/progressionSessionsDetailedList'];
		const selectedSession = sessionsList.find((session) => {
			return ProgressionSessionIdentifier.isCorresponding(
				state.selectionProgressionSessionIdentifier,
				session
			)
		});
		return selectedSession || new ProgressionSessionDetailed();
	},

	progressionSessionSelectionAdjustmentAdditionalCompletionsRequired: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentAdditionalCompletionsRequired;
	},

	progressionSessionSelectionAdjustmentBlockAvailability: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentBlockAvailability;
	},

	progressionSessionSelectionAdjustmentConsiderCompleted: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentConsiderCompleted;
	},

	progressionSessionSelectionAdjustmentDelayInDays: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentDelayInDays;
	},

	progressionSessionSelectionAdjustmentImposeReadyToBeDone: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentImposeReadyToBeDone;
	},

	progressionSessionSelectionAdjustmentOverlookUniqueInDays: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentOverlookUniqueInDays;
	},

	progressionSessionSelectionAdjustmentPreponeAvailability: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentPreponeAvailability;
	},

	progressionSessionSelectionAdjustmentRemoveCompletionLimit: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentRemoveCompletionLimit;
	},

	progressionSessionSelectionAssociativeId: (_, getters) => {
		return getters.progressionSessionSelection.associativeId;
	},

	progressionSessionSelectionAssociativeIdOrdinalNumber: (_, getters) => {
		return getters.progressionSessionSelection.associativeIdOrdinalNumber;
	},

	progressionSessionSelectionCompletionDates: (_, getters) => {
		return getters.progressionSessionSelection.completionDates || [];
	},
	
	progressionSessionSelectionStartDates: (_, getters) => {
		return getters.progressionSessionSelection.startDates || [];
	},

	progressionSessionSelectionTaskStateMarker: (_, getters, __, rootGetters) => {
		const taskStateMarker = rootGetters[
			'managementUsers/progressions/sessions/progressionSessionsTaskStateMarkerForSession'
		](getters.progressionSessionSelection);
		return taskStateMarker;
	},

	progressionSessionSelectionTaskStateMarkerTimeIndicated: (_, getters) => {
		return getters.progressionSessionSelectionTaskStateMarker.timeIndicated;
	},

	progressionSessionSelectionTaskStateMarkerProgressRatio: (_, getters) => {
		return getters.progressionSessionSelectionTaskStateMarker.progressRatio;
	},

	progressionSessionSelectionTitle: (_, getters) => {
		return getters.progressionSessionSelection.title;
	},

	sessionCompletionCountSelection: (state) => {
		return state.selectionSessionCompletionCount;
	}
};
