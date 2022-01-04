import { defaultState } from '@/store-helper/experiment.module-helper';

// Feedback state parameters
export default {
	feedbackNumerical: (state) => {
		return state.state.settings.feedbackNumerical || false;
	},

	successFeedbackMessage: (state) => {
		return state.state.settings.successFeedbackMessage || '';
	},

	failureFeedbackMessage: (state) => {
		return state.state.settings.failureFeedbackMessage || '';
	},

	hideFeedbackSmiley: (state) => {
		let hideFeedbackSmiley = defaultState.DEFAULT_HIDE_FEEDBACK_SMILEY;
		if (typeof state.state.settings.hideFeedbackSmiley === 'boolean') hideFeedbackSmiley = state.state.settings.hideFeedbackSmiley;
		else if (typeof state.settings.hideFeedbackSmiley === 'boolean') hideFeedbackSmiley = state.settings.hideFeedbackSmiley;
		return hideFeedbackSmiley;
	},
};
