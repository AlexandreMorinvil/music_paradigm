import blockHandler from './block-handler';
import { routerNavigation } from '@/_helpers';

export default {
	updateState,
	updateStateOnSkip,
	forceEndState,
};

function updateStateOnSkip(currentState, flow, cursor, isInitialized) {
	if (cursor.current.isBeyondEnd) forceEndState(currentState, isInitialized);
	else if (!isInitialized.media) {
		updateRecords(currentState, flow, cursor, isInitialized);
		updateStateMediaFiles(currentState, flow, cursor, isInitialized);
	}
}

function updateState(currentState, flow, cursor, isInitialized, generalSettings) {
	if (cursor.current.isBeyondEnd) forceEndState(currentState, isInitialized);
	else {
		if (!isInitialized.route) updateRoute(currentState, flow, cursor, isInitialized);
		if (!isInitialized.record) updateRecords(currentState, flow, cursor, isInitialized);
		if (!isInitialized.state) updateStateSettings(currentState, flow, cursor, isInitialized, generalSettings);
		if (!isInitialized.media) updateStateMediaFiles(currentState, flow, cursor, isInitialized);
		if (!isInitialized.content) updateStateContent(currentState, flow, cursor, isInitialized);
	}
}

function forceEndState(currentState, isInitialized, message) {
	// We update the route
	routerNavigation.moveToState('end');

	// We render the state display as empty
	currentState.content.text = message || '';
	currentState.content.pictureName = '';
	currentState.content.interactivePiano = false;

	// We set the initialization status to true
	Object.assign(isInitialized, {
		route: true,
		record: true,
		state: true,
		media: true,
		content: true,
	});
}

function updateRoute(currentState, flow, cursor, isInitialized) {
	currentState.type = blockHandler.getCurrentBlock(flow, cursor).type;
	routerNavigation.moveToState(currentState.type);
	Object.assign(isInitialized, { route: true });
}

function updateRecords(currentState, flow, cursor, isInitialized) {
	const currentBlock = blockHandler.getCurrentBlock(flow, cursor);

	const { startSignal } = currentBlock;
	currentState.record.isWaitingReadyStartSignal = typeof startSignal === 'number' ? startSignal > 0 : false;

	currentState.record.isSuccess = false;
	if (cursor.flag.needsResetLoopParameters) currentState.record.successesInLoop = 0;

	Object.assign(isInitialized, { record: true });
}

function updateStateSettings(currentState, flow, cursor, isInitialized, generalSettings) {
	// Parsing the current block's state settings
	const currentBlock = blockHandler.getCurrentBlock(flow, cursor);
	const {
		anyPianoKey,
		enableSoundFlag,
		playingMode,
		timeoutInSeconds,
		footnote,
		footnoteType,
		logFlag,
		hideFeedbackSmiley,
		skipStepButton,
		skipStepButtonMessage,
		successFeedbackMessage,
		failureFeedbackMessage,
		footnoteMessage,
		melodyRepetition,
		successesForSkipLoop,
		isSkipStepButtonInFootnote,
		startSignal,
		feedbackNumerical,
		interactivePianoFirstOctave,
	} = currentBlock;

	// Set the settings for the state. If no value is found, an appropreate default value is set
	currentState.settings = {
		anyPianoKey: typeof anyPianoKey === 'boolean' ? anyPianoKey : generalSettings.anyPianoKey,
		enableSoundFlag: typeof enableSoundFlag === 'boolean' ? enableSoundFlag : generalSettings.enableSoundFlag,
		playingMode: typeof playingMode === 'string' ? playingMode : generalSettings.playingMode,
		timeoutInSeconds: typeof timeoutInSeconds === 'number' ? timeoutInSeconds : 0,
		footnote: typeof footnote === 'boolean' ? footnote : generalSettings.footnote,
		footnoteType: typeof footnoteType === 'string' ? footnoteType : generalSettings.footnoteType,
		logFlag: typeof logFlag === 'boolean' ? logFlag : generalSettings.logFlag,
		hideFeedbackSmiley: typeof hideFeedbackSmiley === 'boolean' ? hideFeedbackSmiley : generalSettings.hideFeedbackSmiley,
		skipStepButton: typeof skipStepButton === 'string' ? skipStepButton : '',
		skipStepButtonMessage: typeof skipStepButtonMessage === 'string' ? skipStepButtonMessage : '',
		successFeedbackMessage: typeof successFeedbackMessage === 'string' ? successFeedbackMessage : '',
		failureFeedbackMessage: typeof failureFeedbackMessage === 'string' ? failureFeedbackMessage : '',
		footnoteMessage: typeof footnoteMessage === 'string' ? footnoteMessage : '',
		melodyRepetition: typeof melodyRepetition === 'number' ? melodyRepetition : 1,
		successesForSkipLoop: typeof successesForSkipLoop === 'number' ? successesForSkipLoop : generalSettings.successesForSkipLoop,
		isSkipStepButtonInFootnote:
			typeof isSkipStepButtonInFootnote === 'boolean' ? isSkipStepButtonInFootnote : generalSettings.isSkipStepButtonInFootnote,
		startSignal: typeof startSignal === 'number' ? startSignal : 0,
		feedbackNumerical: typeof feedbackNumerical === 'boolean' ? feedbackNumerical : false,
		interactivePianoFirstOctave:
			typeof interactivePianoFirstOctave === 'number' ? interactivePianoFirstOctave : generalSettings.interactivePianoFirstOctave,
	};

	// Indicate that the state (current block's settings) was already initialized
	Object.assign(isInitialized, { state: true });
}

function updateStateMediaFiles(currentState, flow, cursor, isInitialized) {
	// Parsing the current block
	const currentBlock = blockHandler.getCurrentBlock(flow, cursor); // Flow[cursor.current.index];
	const {
		// Media files
		midiFileName,
		videoFileName,
		referenceKeyboardKeys,
	} = currentBlock;

	// Parsing the cursor
	const piledContentIndex = cursor.current.piledContentIndex;

	// Update the media files. If no new value is found, the previous value is used (it is kept unchanged)
	const mediaIndex = piledContentIndex;

	const updatedMidiFileName = Array.isArray(midiFileName) ? midiFileName[mediaIndex] || null : null;
	const updatedVideoFileName = Array.isArray(videoFileName) ? videoFileName[mediaIndex] || null : null;
	const updatedReferenceKeyboardKeys = Array.isArray(referenceKeyboardKeys) ? referenceKeyboardKeys[mediaIndex] || null : null;

	const oldMediaFile = currentState.mediaFile;
	currentState.mediaFile.midiName = updatedMidiFileName || oldMediaFile.midiName;
	currentState.mediaFile.videoName = updatedVideoFileName || oldMediaFile.videoName;
	currentState.mediaFile.referenceKeyboardKeys = updatedReferenceKeyboardKeys || oldMediaFile.referenceKeyboardKeys;

	// Indicate that the media files is initialized
	Object.assign(isInitialized, { media: true });
}

function updateStateContent(currentState, flow, cursor, isInitialized) {
	// Parsing the current block
	const currentBlock = blockHandler.getCurrentBlock(flow, cursor); // Flow[cursor.current.index];
	const {
		// Content elements
		textContent,
		pictureFileName,
		helperImageFileName,
		interactivePiano,
	} = currentBlock;

	// Parsing the cursor
	const piledContentIndex = cursor.current.piledContentIndex;

	let updatedTextContent = Array.isArray(textContent) ? textContent[piledContentIndex] || null : null;
	let updatedPictureFileName = Array.isArray(pictureFileName) ? pictureFileName[piledContentIndex] || null : null;
	let updatedHelperImageFileName = Array.isArray(helperImageFileName) ? helperImageFileName[piledContentIndex] || null : null;
	let updatedInteractivePiano = Array.isArray(interactivePiano) ? interactivePiano[piledContentIndex] || false : false;

	const innerStepIndex = cursor.current.innerStepIndex;

	if (Array.isArray(updatedTextContent)) updatedTextContent = updatedTextContent[innerStepIndex];
	if (Array.isArray(updatedPictureFileName)) updatedPictureFileName = updatedPictureFileName[innerStepIndex];
	if (Array.isArray(updatedHelperImageFileName)) updatedHelperImageFileName = updatedHelperImageFileName[innerStepIndex];
	if (Array.isArray(updatedInteractivePiano)) updatedInteractivePiano = updatedInteractivePiano[innerStepIndex];

	currentState.content.text = updatedTextContent || '';
	currentState.content.pictureName = updatedPictureFileName || '';
	currentState.content.helperImageName = updatedHelperImageFileName || '';
	currentState.content.interactivePiano = updatedInteractivePiano || false;

	// Indicate that the media files is initialized
	Object.assign(isInitialized, { content: false });
}
