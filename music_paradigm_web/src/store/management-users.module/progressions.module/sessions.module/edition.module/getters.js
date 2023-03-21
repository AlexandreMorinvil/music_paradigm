export default {
	progressionSessionEditionAdjustmentAdditionalCompletionsRequired: (state) => {
		return state.editionUserProgression.adjustmentAdditionalCompletionsRequired;
	},

	progressionSessionEditionAdjustmentBlockAvailability: (state) => {
		return state.editionUserProgression.adjustmentBlockAvailability;
	},

	progressionSessionEditionAdjustmentConsiderCompleted: (state) => {
		return state.editionUserProgression.adjustmentConsiderCompleted;
	},

	progressionSessionEditionAdjustmentDelayInDays: (state) => {
		return state.editionUserProgression.adjustmentDelayInDays;
	},

	progressionSessionEditionAdjustmentImposeReadyToBeDone: (state) => {
		return state.editionUserProgression.adjustmentImposeReadyToBeDone;
	},

	progressionSessionEditionAdjustmentOverlookUniqueInDays: (state) => {
		return state.editionUserProgression.adjustmentOverlookUniqueInDays;
	},

	progressionSessionEditionAdjustmentPreponeAvailability: (state) => {
		return state.editionUserProgression.adjustmentPreponeAvailability;
	},

	progressionSessionEditionAdjustmentRemoveCompletionLimit: (state) => {
		return state.editionUserProgression.adjustmentRemoveCompletionLimit;
	},
};
