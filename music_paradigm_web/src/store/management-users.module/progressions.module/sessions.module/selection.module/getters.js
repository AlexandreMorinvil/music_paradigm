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

	progressionSessionAdjustmentDelayInDays: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentDelayInDays;
	},

	progressionSessionAdjustmentConsiderCompleted: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentConsiderCompleted;
	},

	progressionSessionAdjustmentAdditionalCompletionsRequired: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentAdditionalCompletionsRequired;
	},

	progressionSessionAdjustmentPreponeAvailability: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentPreponeAvailability;
	},

	progressionSessionAdjustmentOverlookUniqueInDays: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentOverlookUniqueInDays;
	},

	progressionSessionAdjustmentImposeReadyToBeDone: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentImposeReadyToBeDone;
	},

	progressionSessionAdjustmentBlockAvailability: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentBlockAvailability;
	},

	progressionSessionAdjustmentRemoveCompletionLimit: (_, getters) => {
		return getters.progressionSessionSelection.adjustmentRemoveCompletionLimit;
	},

	progressionSessionSelectionTitle: (_, getters) => {
		return getters.progressionSessionSelection.title;
	},

	progressionSessionSelectionText: (_, getters) => {
		return getters.progressionSessionSelection.text;
	},

	progressionSessionSelectionDelayInDays: (_, getters) => {
		return getters.progressionSessionSelection.delayInDays;
	},

	progressionSessionSelectionReleaseTime: (_, getters) => {
		return getters.progressionSessionSelection.releaseTime;
	},

	progressionSessionSelectionIsUniqueInDay: (_, getters) => {
		return getters.progressionSessionSelection.isUniqueInDay;
	},

	progressionSessionSelectionIsCompletionLimited: (_, getters) => {
		return getters.progressionSessionSelection.isCompletionLimited;
	},

	progressionSessionSelectionStartCount: (_, getters) => {
		return getters.progressionSessionSelection.startCount;
	},

	progressionSessionSelectionInitialStartDate: (_, getters) => {
		return getters.progressionSessionSelection.initialStartDate;
	},

	progressionSessionSelectionStartDates: (_, getters) => {
		return getters.progressionSessionSelection.startDates || [];
	},

	progressionSessionSelectionCompletionCount: (_, getters) => {
		return getters.progressionSessionSelection.completionCount;
	},

	progressionSessionSelectionAdvanceCompeletionDate: (_, getters) => {
		return getters.progressionSessionSelection.advanceCompeletionDate;
	},

	progressionSessionSelectionCompletionDates: (_, getters) => {
		return getters.progressionSessionSelection.completionDates || [];
	},

	progressionSessionDelayPreAvailabilityInDays: (_, getters) => {
		return getters.progressionSessionSelection.delayPreAvailabilityInDays;
	},

	progressionSessionIsLockedByCompletionLimit: (_, getters) => {
		return getters.progressionSessionSelection.isLockedByCompletionLimit;
	},

	progressionSessionIsDelayedByPreviousSequential: (_, getters) => {
		return getters.progressionSessionSelection.isDelayedByPreviousSequential;
	},

	progressionSessionIsDelayedByPreviousUniqueInDay: (_, getters) => {
		return getters.progressionSessionSelection.isDelayedByPreviousUniqueInDay;
	},

	progressionSessionIsAvailable: (_, getters) => {
		return getters.progressionSessionSelection.isAvailable;
	},

	sessionCompletionCountSelection: (state) => {
		return state.selectionSessionCompletionCount;
	}
};
