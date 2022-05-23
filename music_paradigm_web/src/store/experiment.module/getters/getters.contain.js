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
	hasInteractiveClicker: (state) => {
		return Boolean(state.state.content.interactiveClicker);
	},

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
		return Boolean(state.state.settings.skipStepButton) || Boolean(state.state.settings.skipStepButtonMessage);
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

	hasMainOptionText(state) {
		return Boolean(state.state.settings.mainOptionText);
	},

	isSkipButtonInCorner: (state, getters) => {
		const isInMainOptions = getters.isSkipButtonInMainOptions;
		const isInFootnote = getters.isSkipButtonInFootnote;
		return !isInMainOptions && !isInFootnote;
	},

	isSkipButtonInFootnote: (state, getters) => {
		const isSkipButtonInMainOptions = getters.isSkipButtonInMainOptions;
		const hasFootnote = state.state.settings.footnote;
		const isFootnoteButtonType = state.state.settings.footnoteType === 'button';
		const isAskedToPutSkipButtonInFootnote = state.state.settings.isSkipStepButtonInFootnote;
		return !isSkipButtonInMainOptions && hasFootnote && isFootnoteButtonType && isAskedToPutSkipButtonInFootnote;
	},

	isSkipButtonInMainOptions: (state) => {
		const canHaveMainOptionsSkipButton = ['survey', 'writting'].includes(state.state.type);
		const isAskedToPutSkipButtonInMainOptions = state.state.settings.isSkipButtonInMainOptions;
		return canHaveMainOptionsSkipButton && isAskedToPutSkipButtonInMainOptions;
	},

	isGoBackButtonInFootnote: (state) => {
		return state.state.settings.footnote && state.state.settings.footnoteType === 'button' && state.state.settings.isGoBackButtonInFootnote;
	},

	isWaitingStartSignal: (state) => {
		return state.state.record.isWaitingReadyStartSignal;
	},

	hasPrelude: (state) => {
		return Array.isArray(state.flowPrelude) && state.flowPrelude.length > 0;
	},

	hasConclusionFlow: (state) => {
		return Array.isArray(state.flowConclusion) && state.flowConclusion.length > 0;
	},
};
