import { defaultState } from '@/store-helper/experiment.module-helper';

// Getters used for the content disposition on the screen
export default {
	hasFootnote: (state) => {
		let hasFootNote = defaultState.DEFAULT_FOOTNOTE;
		if (typeof state.state.settings.footnote === 'boolean') hasFootNote = state.state.settings.footnote;
		else if (typeof state.settings.footnote === 'boolean') hasFootNote = state.settings.footnote;
		return hasFootNote;
	},

	hasVideo: (state) => {
		return Boolean(state.state.mediaFile.videoName);
	},

	// TODO: Verify logic
	hasInteractivePiano: (state) => {
		return Boolean(state.state.content.interactivePiano);
	},

	hasInteractiveKeyboard: (state) => {
		return Boolean(state.state.content.interactiveKeyboard);
	},

	hasPicture: (state) => {
		return Boolean(state.state.content.pictureName);
	},

	hasHelperImage: (state) => {
		return Boolean(state.state.content.helperImageName);
	},

	hasTextReminder: (state) => {
		return Boolean(state.state.content.textReminder);
	},

	hasSkipOption: (state) => {
		return Boolean(state.state.settings.skipStepButton);
	},

	hasGoBackOption: (state) => {
		const hasPreviousInnerStep = state.cursor.current.innerStepIndex > 0;
		return hasPreviousInnerStep && state.state.settings.canGoBack;
	},

	hasSuccessFeedbackMessage(state) {
		return Boolean(state.state.settings.successFeedbackMessage);
	},
	hasFailureFeedbackMessage(state) {
		return Boolean(state.state.settings.failureFeedbackMessage);
	},

	isSkipButtonInFootnote: (state) => {
		return state.state.settings.footnote && state.state.settings.footnoteType === 'button' && state.state.settings.isSkipStepButtonInFootnote;
	},

	isGoBackButtonInFootnote: (state) => {
		return state.state.settings.footnote && state.state.settings.footnoteType === 'button' && state.state.settings.isGoBackButtonInFootnote;
	},

	isWaitingStartSignal: (state) => {
		return state.state.record.isWaitingReadyStartSignal;
	},

	hasPrelude: (state) => {
		return Array.isArray(state.prelude) && state.prelude.length > 0;
	},
};
