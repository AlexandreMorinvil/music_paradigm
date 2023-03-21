import { ProgressionSessionDetailed, ProgressionSessionIdentifier } from "@/modules/progressions";

export default {
	hasSelectedProgressionSession: (_, getters) => {
		return Boolean(getters.progressionSessionSelection.associativeId);
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

	progressionSessionSelectionAdvanceCompeletionDate: (_, getters) => {
		return getters.progressionSessionSelection.advanceCompeletionDate;
	},

	progressionSessionSelectionAssociativeId: (_, getters) => {
		return getters.progressionSessionSelection.associativeId;
	},

	progressionSessionSelectionAssociativeIdOrdinalNumber: (_, getters) => {
		return getters.progressionSessionSelection.associativeIdOrdinalNumber;
	},

	progressionSessionSelectionCompletionCount: (_, getters) => {
		return getters.progressionSessionSelection.completionCount;
	},

	progressionSessionSelectionCompletionDates: (_, getters) => {
		return getters.progressionSessionSelection.completionDates || [];
	},

	progressionSessionSelectionDelayInDays: (_, getters) => {
		return getters.progressionSessionSelection.delayInDays;
	},

	progressionSessionSelectionDelayPreAvailabilityInDays: (_, getters) => {
		return getters.progressionSessionSelection.delayPreAvailabilityInDays;
	},

	progressionSessionSelectionInitialStartDate: (_, getters) => {
		return getters.progressionSessionSelection.initialStartDate;
	},

	progressionSessionSelectionIsCompletionLimited: (_, getters) => {
		return getters.progressionSessionSelection.isCompletionLimited;
	},

	progressionSessionSelectionIsUniqueInDay: (_, getters) => {
		return getters.progressionSessionSelection.isUniqueInDay;
	},

	progressionSessionSelectionIsAvailable: (_, getters) => {
		return getters.progressionSessionSelection.isAvailable;
	},

	progressionSessionSelectionIsDelayedByPreviousSequential: (_, getters) => {
		return getters.progressionSessionSelection.isDelayedByPreviousSequential;
	},

	progressionSessionSelectionIsDelayedByPreviousUniqueInDay: (_, getters) => {
		return getters.progressionSessionSelection.isDelayedByPreviousUniqueInDay;
	},

	progressionSessionSelectionIsLockedByCompletionLimit: (_, getters) => {
		return getters.progressionSessionSelection.isLockedByCompletionLimit;
	},
	
	progressionSessionSelectionReleaseTime: (_, getters) => {
		return getters.progressionSessionSelection.releaseTime;
	},
	
	progressionSessionSelectionStartCount: (_, getters) => {
		return getters.progressionSessionSelection.startCount;
	},
	
	progressionSessionSelectionStartDates: (_, getters) => {
		return getters.progressionSessionSelection.startDates || [];
	},

	progressionSessionSelectionText: (_, getters) => {
		return getters.progressionSessionSelection.text;
	},

	progressionSessionSelectionTitle: (_, getters) => {
		return getters.progressionSessionSelection.title;
	},

	sessionCompletionCountSelection: (state) => {
		return state.selectionSessionCompletionCount;
	}
};
