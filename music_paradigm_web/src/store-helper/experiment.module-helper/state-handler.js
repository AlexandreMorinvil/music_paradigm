/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import blockHandler from './block-handler';
import { routerNavigation } from '@/_helpers';

export default {
	imposeState,
	updateState,
	updateStateOnSkip,
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
	// Get the target state and if no block is specified, we abort the operation
	const targetState = blockHandler.getCurrentBlock(flow, cursor);
	if (!targetState) return;
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

	const { startSignal, considerExperimentFinished, logLabel } = currentBlock;

	// If a start signal's delay is indicated, we set its value here 
	currentState.record.isWaitingReadyStartSignal = typeof startSignal === 'number' ? startSignal > 0 : false;

	// If the considerExperimentFinished record is already set to true, is will permanently stay true
	// Otherwise, we set this record to the value given in the experiment, if a value is provided
	if (!currentState.record.considerExperimentFinished) currentState.record.considerExperimentFinished = typeof considerExperimentFinished === 'boolean' ? considerExperimentFinished : false;
	if (logLabel && currentState.record.logLabel !== logLabel && typeof logLabel === 'string') currentState.record.logLabel = logLabel;

	// When moving to a new state, we systematically considered that the state was not a success (yet)
	currentState.record.isSuccess = false;

	// If the cursor indicate that we have reached a new iteration of a loop through its 'needsResetLoopParameters' flag,
	// we reset the amount of successes that was accumulated in the loop so far
	if (cursor.flag.needsResetLoopParameters) {
		currentState.record.previousSucessesInLoop = currentState.record.successesInLoop;
		currentState.record.successesInLoop = 0;
	}

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
		skipIfNotMetSuccessGoal,
		surveyOptionsAreRadio,
		surveyAreAnswersMandatory,
		writtingMaxCharacters,
		writtingMinCharacters,
		writtingIsNumber,
		writtingIsMultiline,
		writtingTextPlaceHolder,
		questionType,
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
		skipIfNotMetSuccessGoal:		typeof skipIfNotMetSuccessGoal === 'number' 	? skipIfNotMetSuccessGoal : 0,
		surveyOptionsAreRadio: 			typeof surveyOptionsAreRadio === 'boolean'		? surveyOptionsAreRadio : true,
		surveyAreAnswersMandatory:		typeof surveyAreAnswersMandatory === 'boolean'	? surveyAreAnswersMandatory : true,
		writtingMaxCharacters:			typeof writtingMaxCharacters === 'number'		? writtingMaxCharacters : 0,
		writtingMinCharacters:			typeof writtingMinCharacters === 'number'		? writtingMinCharacters : 100,
		writtingIsNumber:				typeof writtingIsNumber === 'boolean'			? writtingIsNumber : false,
		writtingIsMultiline:			typeof writtingIsMultiline === 'boolean'		? writtingIsMultiline : true,
		writtingTextPlaceHolder: 		typeof writtingTextPlaceHolder === 'string'		? writtingTextPlaceHolder : '',
		questionType:					typeof questionType === 'string' 				? questionType : generalSettings.questionType,
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
		audioFirstPart,
		audioSecondPart,
	} = currentBlock;

	// Using the values that are not set in an array if there are any
	let updatedMidiFileName = typeof midiFileName === 'string' ? midiFileName : null;
	let updatedVideoFileName = typeof videoFileName === 'string' ? videoFileName : null;
	let updatedAudioFirstPart = typeof audioFirstPart === 'string' ? audioFirstPart : null;
	let updatedAudioSecondPart = typeof audioSecondPart === 'string' ? audioSecondPart : null;

	let updatedReferenceKeyboardKeys = (Array.isArray(referenceKeyboardKeys) && referenceKeyboardKeys.every(key => (typeof key === 'string'))) ? referenceKeyboardKeys : null;

	// Update the media files. If no new value is found, the previous value is used (it is kept unchanged)
	const mediaIndex = cursor.current.piledContentIndex;

	if (Array.isArray(midiFileName)) updatedMidiFileName = midiFileName[mediaIndex];
	if (Array.isArray(videoFileName)) updatedVideoFileName = videoFileName[mediaIndex];
	if (Array.isArray(audioFirstPart)) updatedAudioFirstPart = audioFirstPart[mediaIndex];
	if (Array.isArray(audioSecondPart)) updatedAudioSecondPart = audioSecondPart[mediaIndex];
	if (referenceKeyboardKeys && Array.isArray(referenceKeyboardKeys[mediaIndex])) updatedReferenceKeyboardKeys = referenceKeyboardKeys[mediaIndex];

	const updatedInteractiveKeyboardTextMapping = Array.isArray(interactiveKeyboardTextMapping) ? interactiveKeyboardTextMapping[mediaIndex] || false : false;

	// If the midifileName is specified (whether it is new or not), we also reset the virtual piano's text
	const oldMediaFile = currentState.mediaFile;
	if (updatedMidiFileName) oldMediaFile.interactiveKeyboardTextMapping = null;

	// We adjust the current state and keep the previous value if no new value is provided
	currentState.mediaFile.midiName = updatedMidiFileName || oldMediaFile.midiName;
	currentState.mediaFile.videoName = updatedVideoFileName || oldMediaFile.videoName;
	currentState.mediaFile.audioFirstPart = updatedAudioFirstPart || oldMediaFile.audioFirstPart;
	currentState.mediaFile.audioSecondPart = updatedAudioSecondPart || oldMediaFile.audioSecondPart;
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
		textReminder,
		interactivePiano,
		interactiveKeyboard,

		surveyInputOptionsValues,
		surveyInputOptionsText,
		surveyLeftSideText,
		surveyRightSideText,

		textAfterQuestionAsked,
		textSpecification,
	} = currentBlock;

	// Using the values that are not set in an array if there are any
	let updatedTextContent = typeof textContent === 'string' ? textContent : null;
	let updatedPictureFileName = typeof pictureFileName === 'string' ? pictureFileName : null;
	let updatedHelperImageFileName = typeof helperImageFileName === 'string' ? helperImageFileName : null;
	let updatedTextReminder = typeof textReminder === 'string' ? textReminder : null;
	let updatedInteractivePiano = typeof interactivePiano === 'string' || typeof interactivePiano === 'boolean' ? interactivePiano : null;
	let updatedInteractiveKeyboard = typeof interactiveKeyboard === 'string' || typeof interactiveKeyboard === 'boolean' ? interactiveKeyboard : null;

	let updatedTextAfterQuestionAsked = typeof textAfterQuestionAsked === 'string' ? textAfterQuestionAsked : null;
	let updatedTextSpecification = typeof textSpecification === 'string' ? textSpecification : null;

	// If the value is in an array
	const piledContentIndex = cursor.current.piledContentIndex;

	if (Array.isArray(textContent)) updatedTextContent = textContent[piledContentIndex] || null;
	if (Array.isArray(pictureFileName)) updatedPictureFileName = pictureFileName[piledContentIndex] || null;
	if (Array.isArray(helperImageFileName)) updatedHelperImageFileName = helperImageFileName[piledContentIndex] || null;
	if (Array.isArray(textReminder)) updatedTextReminder = textReminder || null;
	if (Array.isArray(interactivePiano)) updatedInteractivePiano = interactivePiano[piledContentIndex] || null;
	if (Array.isArray(interactiveKeyboard)) updatedInteractiveKeyboard = interactiveKeyboard[piledContentIndex] || null;

	if (Array.isArray(textAfterQuestionAsked)) updatedTextAfterQuestionAsked = textAfterQuestionAsked || null;
	if (Array.isArray(textSpecification)) updatedTextSpecification = textSpecification || null;

	// If the value is in a nested array
	const innerStepIndex = cursor.current.innerStepIndex;

	if (Array.isArray(updatedTextContent)) updatedTextContent = updatedTextContent[innerStepIndex];
	if (Array.isArray(updatedPictureFileName)) updatedPictureFileName = updatedPictureFileName[innerStepIndex];
	if (Array.isArray(updatedHelperImageFileName)) updatedHelperImageFileName = updatedHelperImageFileName[innerStepIndex];
	if (Array.isArray(updatedTextReminder)) updatedTextReminder = updatedTextReminder[innerStepIndex];
	if (Array.isArray(updatedInteractivePiano)) updatedInteractivePiano = updatedInteractivePiano[innerStepIndex];
	if (Array.isArray(updatedInteractiveKeyboard)) updatedInteractiveKeyboard = updatedInteractiveKeyboard[innerStepIndex];

	// === Update the state ===
	// Elements which support the shorthand notation with array nesting
	currentState.content.text = updatedTextContent || '';
	currentState.content.pictureName = updatedPictureFileName || '';
	currentState.content.helperImageName = updatedHelperImageFileName || '';
	currentState.content.textReminder = updatedTextReminder || '';
	currentState.content.interactivePiano = updatedInteractivePiano || false;
	currentState.content.interactiveKeyboard = updatedInteractiveKeyboard || false;

	currentState.content.textAfterQuestionAsked = updatedTextAfterQuestionAsked || '';
	currentState.content.textSpecification = updatedTextSpecification || '';

	// Parsing the survey parameters (they do no support short notations through nesting)
	currentState.content.surveyInputOptionsValues = (Array.isArray(surveyInputOptionsValues)) ? surveyInputOptionsValues : [];
	currentState.content.surveyInputOptionsText = (Array.isArray(surveyInputOptionsText)) ? surveyInputOptionsText : [];
	currentState.content.surveyLeftSideText = (Array.isArray(surveyLeftSideText)) ? surveyLeftSideText : [];
	currentState.content.surveyRightSideText = (Array.isArray(surveyRightSideText)) ? surveyRightSideText : [];


	// Indicate that the media files is initialized
	Object.assign(isInitialized, { content: true });
}
