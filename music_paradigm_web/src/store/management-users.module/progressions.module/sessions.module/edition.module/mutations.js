import { ProgressionSessionDetailed } from '@/modules/progressions'

export default {
	editProgressionSessionEditionAdjustmentAdditionalCompletionsRequired(state, value) {
		state.editionUserProgression.adjustmentAdditionalCompletionsRequired = value;
	},

	editProgressionSessionEditionAdjustmentBlockAvailability(state, value) {
		state.editionUserProgression.adjustmentBlockAvailability = value;
	},

	editProgressionSessionEditionAdjustmentConsiderCompleted(state, value) {
		state.editionUserProgression.adjustmentConsiderCompleted = value;
	},

	editProgressionSessionEditionAdjustmentDelayInDays(state, value) {
		state.editionUserProgression.adjustmentDelayInDays = value;
	},

	editProgressionSessionEditionAdjustmentImposeReadyToBeDone(state, value) {
		state.editionUserProgression.adjustmentImposeReadyToBeDone = value;
	},

	editProgressionSessionEditionAdjustmentOverlookUniqueInDays(state, value) {
		state.editionUserProgression.adjustmentOverlookUniqueInDays = value;
	},

	editProgressionSessionEditionAdjustmentPreponeAvailability(state, value) {
		state.editionUserProgression.adjustmentPreponeAvailability = value;
	},

	editProgressionSessionEditionAdjustmentRemoveCompletionLimit(state, value) {
		state.editionUserProgression.adjustmentRemoveCompletionLimit = value;
	},

    setProgressionSessionEdition(state, session) {
		state.editionUserProgression = new ProgressionSessionDetailed(session);
	},

    unsetProgressionSessionEdition(state) {
		state.editionUserProgression = new ProgressionSessionDetailed();
	},
};
