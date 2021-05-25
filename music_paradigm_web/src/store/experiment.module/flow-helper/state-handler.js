/* eslint-disable max-lines-per-function */
/* eslint-disable prettier/prettier */
/* eslint-disable key-spacing */
import blockHandler from './block-handler';
import { routerNavigation } from '@/_helpers';

export default {
	updateState,
	updateStateOnSkip,
	imposeState,
};

function transitionState(currentState, targetState, cursor, isInitialized, generalSettings) {
	if (!isInitialized.route) updateRoute(currentState, targetState, isInitialized);
	if (!isInitialized.record) updateRecords(currentState, targetState, cursor, isInitialized);
	if (!isInitialized.state) updateStateSettings(currentState, targetState, isInitialized, generalSettings);
	if (!isInitialized.media) updateStateMediaFiles(currentState, targetState, cursor, isInitialized);
	if (!isInitialized.content) updateStateContent(currentState, targetState, cursor, isInitialized);
}

function imposeState(currentState, targetState, cursor, isInitialized, generalSettings) {
	transitionState(currentState, targetState, cursor, isInitialized, generalSettings);
}

function updateState(currentState, flow, cursor, isInitialized, generalSettings) {
	const targetState = blockHandler.getCurrentBlock(flow, cursor);
	transitionState(currentState, targetState, cursor, isInitialized, generalSettings);
}

function updateStateOnSkip(currentState, flow, cursor, isInitialized) {
	const targetState = blockHandler.getCurrentBlock(flow, cursor);
	if (!isInitialized.media) {
		updateRecords(currentState, targetState, cursor, isInitialized);
		updateStateMediaFiles(currentState, targetState, cursor, isInitialized);
	}
}

// Functions to perform the state transition
function updateRoute(currentState, targetState, isInitialized) {
	currentState.type = targetState.type;
	routerNavigation.moveToState(currentState.type);
	Object.assign(isInitialized, { route: true });
}

function updateRecords(currentState, targetState, cursor, isInitialized) {
	const currentBlock = targetState;

	const { startSignal } = currentBlock;
	currentState.record.isWaitingReadyStartSignal = typeof startSignal === 'number' ? startSignal > 0 : false;

	currentState.record.isSuccess = false;
	if (cursor.flag.needsResetLoopParameters) currentState.record.successesInLoop = 0;

	Object.assign(isInitialized, { record: true });
}

function updateStateSettings(currentState, targetState, isInitialized, generalSettings) {
	// Parsing the current block's state settings
	const currentBlock = targetState;
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
		isGoBackButtonInFootnote,
		startSignal,
		feedbackNumerical,
		interactivePianoFirstOctave,
		skipLoopOnLastRepetition,
		canGoBack,
		goBackStepButton,
		goBackButtonMessage,
		checkpoint,
		strictPlay,
	} = currentBlock;

	// Set the settings for the state. If no value is found, an appropreate default value is set
	currentState.settings = {
		anyPianoKey: 					typeof anyPianoKey === 'boolean' 				? anyPianoKey : generalSettings.anyPianoKey,
		enableSoundFlag: 				typeof enableSoundFlag === 'boolean' 			? enableSoundFlag : generalSettings.enableSoundFlag,
		playingMode: 					typeof playingMode === 'string' 				? playingMode : generalSettings.playingMode,
		timeoutInSeconds: 				typeof timeoutInSeconds === 'number' 			? timeoutInSeconds : 0,
		footnote: 						typeof footnote === 'boolean' 					? footnote : generalSettings.footnote,
		footnoteType: 					typeof footnoteType === 'string' 				? footnoteType : generalSettings.footnoteType,
		logFlag: 						typeof logFlag === 'boolean' 					? logFlag : generalSettings.logFlag,
		hideFeedbackSmiley: 			typeof hideFeedbackSmiley === 'boolean' 		? hideFeedbackSmiley : generalSettings.hideFeedbackSmiley,
		skipStepButton: 				typeof skipStepButton === 'string' 				? skipStepButton : '',
		skipStepButtonMessage: 			typeof skipStepButtonMessage === 'string' 		? skipStepButtonMessage : '',
		successFeedbackMessage: 		typeof successFeedbackMessage === 'string' 		? successFeedbackMessage : '',
		failureFeedbackMessage: 		typeof failureFeedbackMessage === 'string' 		? failureFeedbackMessage : '',
		footnoteMessage: 				typeof footnoteMessage === 'string' 			? footnoteMessage : '',
		melodyRepetition: 				typeof melodyRepetition === 'number' 			? melodyRepetition : 1,
		successesForSkipLoop: 			typeof successesForSkipLoop === 'number' 		? successesForSkipLoop : generalSettings.successesForSkipLoop,
		isSkipStepButtonInFootnote: 	typeof isSkipStepButtonInFootnote === 'boolean' ? isSkipStepButtonInFootnote : generalSettings.isSkipStepButtonInFootnote,
		isGoBackButtonInFootnote: 		typeof isGoBackButtonInFootnote === 'boolean' 	? isGoBackButtonInFootnote : generalSettings.isGoBackButtonInFootnote,
		startSignal: 					typeof startSignal === 'number' 				? startSignal : 0,
		feedbackNumerical: 				typeof feedbackNumerical === 'boolean' 			? feedbackNumerical : false,
		interactivePianoFirstOctave: 	typeof interactivePianoFirstOctave === 'number' ? interactivePianoFirstOctave : generalSettings.interactivePianoFirstOctave,
		skipLoopOnLastRepetition: 		typeof skipLoopOnLastRepetition === 'boolean' 	? skipLoopOnLastRepetition : false,
		canGoBack: 						typeof canGoBack === 'boolean' 					? canGoBack : false,
		goBackStepButton: 				typeof goBackStepButton === 'string' 			? goBackStepButton : '',
		goBackButtonMessage: 			typeof goBackButtonMessage === 'string' 		? goBackButtonMessage : '',
		checkpoint: 					typeof checkpoint === 'string' 					? checkpoint : false,
		strictPlay: 					typeof strictPlay === 'boolean' 				? strictPlay : false,
	};

	// Indicate that the state (current block's settings) was already initialized
	Object.assign(isInitialized, { state: true });
}

function updateStateMediaFiles(currentState, targetState, cursor, isInitialized) {
	// Parsing the current block
	const currentBlock = targetState; // Flow[cursor.current.index];
	const {
		// Media files
		midiFileName,
		videoFileName,
		referenceKeyboardKeys,
		interactiveKeyboardTextMapping,
	} = currentBlock;

	// Using the values that are not set in an array if there are any
	let updatedMidiFileName = typeof midiFileName === 'string' ? midiFileName : null;
	let updatedVideoFileName = typeof videoFileName === 'string' ? videoFileName : null;
	let updatedReferenceKeyboardKeys = Array.isArray(referenceKeyboardKeys) ? referenceKeyboardKeys : null;
	let updatedInteractiveKeyboardTextMapping = Array.isArray(interactiveKeyboardTextMapping) ? interactiveKeyboardTextMapping : null;

	// Update the media files. If no new value is found, the previous value is used (it is kept unchanged)
	const mediaIndex = cursor.current.piledContentIndex;

	updatedMidiFileName = Array.isArray(midiFileName) ? midiFileName[mediaIndex] || null : null;
	updatedVideoFileName = Array.isArray(videoFileName) ? videoFileName[mediaIndex] || null : null;
	updatedReferenceKeyboardKeys = (updatedReferenceKeyboardKeys && Array.isArray(updatedReferenceKeyboardKeys[mediaIndex])) ? updatedReferenceKeyboardKeys[mediaIndex] || null : null;
	updatedInteractiveKeyboardTextMapping = (updatedInteractiveKeyboardTextMapping && Array.isArray(updatedInteractiveKeyboardTextMapping[mediaIndex])) ? updatedInteractiveKeyboardTextMapping[mediaIndex] || false : false;

	// If the midifileName is specified (whether it is new or not), we also reset the virtual piano's text
	const oldMediaFile = currentState.mediaFile;
	if (updatedMidiFileName) oldMediaFile.interactiveKeyboardTextMapping = null;

	// We adjust the current state and keep the previous value if no new value is provided
	currentState.mediaFile.midiName = updatedMidiFileName || oldMediaFile.midiName;
	currentState.mediaFile.videoName = updatedVideoFileName || oldMediaFile.videoName;
	currentState.mediaFile.referenceKeyboardKeys = updatedReferenceKeyboardKeys || oldMediaFile.referenceKeyboardKeys;
	currentState.mediaFile.interactiveKeyboardTextMapping = updatedInteractiveKeyboardTextMapping || oldMediaFile.interactiveKeyboardTextMapping;

	// Indicate that the media files is initialized
	Object.assign(isInitialized, { media: true });
}

function updateStateContent(currentState, targetState, cursor, isInitialized) {
	// Parsing the current block
	const currentBlock = targetState; // Flow[cursor.current.index];
	const {
		// Content elements
		textContent,
		pictureFileName,
		helperImageFileName,
		interactivePiano,
		interactiveKeyboard,
	} = currentBlock;

	// Using the values that are not set in an array if there are any
	let updatedTextContent = typeof textContent === 'string' ? textContent : null;
	let updatedPictureFileName = typeof pictureFileName === 'string' ? pictureFileName : null;
	let updatedHelperImageFileName = typeof helperImageFileName === 'string' ? helperImageFileName : null;
	let updatedInteractivePiano = typeof interactivePiano === 'string' || typeof interactivePiano === 'boolean' ? interactivePiano : null;
	let updatedInteractiveKeyboard = typeof interactiveKeyboard === 'string' || typeof interactiveKeyboard === 'boolean' ? interactiveKeyboard : null;

	// If the value is in an array
	const piledContentIndex = cursor.current.piledContentIndex;

	if (Array.isArray(textContent)) updatedTextContent = textContent[piledContentIndex] || null;
	if (Array.isArray(pictureFileName)) updatedPictureFileName = pictureFileName[piledContentIndex] || null;
	if (Array.isArray(helperImageFileName)) updatedHelperImageFileName = helperImageFileName[piledContentIndex] || null;
	if (Array.isArray(interactivePiano)) updatedInteractivePiano = interactivePiano[piledContentIndex] || null;
	if (Array.isArray(interactiveKeyboard)) updatedInteractiveKeyboard = interactiveKeyboard[piledContentIndex] || null;

	// If the value is in a nested array
	const innerStepIndex = cursor.current.innerStepIndex;

	if (Array.isArray(updatedTextContent)) updatedTextContent = updatedTextContent[innerStepIndex];
	if (Array.isArray(updatedPictureFileName)) updatedPictureFileName = updatedPictureFileName[innerStepIndex];
	if (Array.isArray(updatedHelperImageFileName)) updatedHelperImageFileName = updatedHelperImageFileName[innerStepIndex];
	if (Array.isArray(updatedInteractivePiano)) updatedInteractivePiano = updatedInteractivePiano[innerStepIndex];
	if (Array.isArray(updatedInteractiveKeyboard)) updatedInteractiveKeyboard = updatedInteractiveKeyboard[innerStepIndex];

	// Update the state
	currentState.content.text = updatedTextContent || '';
	currentState.content.pictureName = updatedPictureFileName || '';
	currentState.content.helperImageName = updatedHelperImageFileName || '';
	currentState.content.interactivePiano = updatedInteractivePiano || false;
	currentState.content.interactiveKeyboard = updatedInteractiveKeyboard || false;

	// Indicate that the media files is initialized
	Object.assign(isInitialized, { content: true });
}
