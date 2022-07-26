/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import blockHandler from './block-handler';
import defaultState from './default-state';
import { routerNavigation } from '@/_helpers';

export default {
	initializeStartState,
	updateState,
	updateStateOnSkip,
};

function initializeStartState(stateToInitialize, initialState = null) {
	if (initialState) {
		stateToInitialize = initialState;
	} else {
		const defaultInitialState = defaultState.DEFAULT_EXPERIMENT_STATE_STATE_VALUES();
		Object.assign(defaultInitialState.record, stateToInitialize.record);
		stateToInitialize = defaultInitialState;
	}
}

function updateState(currentState, flow, cursor, isInitialized, generalSettings) {
	// Get the target state and if no block is specified, we abort the operation
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

function transitionState(currentState, targetState, cursor, isInitialized, generalSettings) {
	if (!isInitialized.route) updateRoute(currentState, targetState, isInitialized);
	if (!isInitialized.record) updateRecords(currentState, targetState, cursor, isInitialized);
	if (!isInitialized.state) updateStateSettings(currentState, targetState, isInitialized, generalSettings);
	if (!isInitialized.media) updateStateMediaFiles(currentState, targetState, cursor, isInitialized);
	if (!isInitialized.content) updateStateContent(currentState, targetState, cursor, isInitialized);
	if (!isInitialized.options) updateStateOptionsContent(currentState, targetState, isInitialized);
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
		isSkipButtonInMainOptions,
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
		surveyType,
		surveyOptionsAreRadio,
		surveyAreAnswersMandatory,
		writtingMaxCharacters,
		writtingMinCharacters,
		writtingIsNumber,
		writtingIsMultiline,
		writtingTextPlaceHolder,
		questionType,
		areAnswerOptionsVertical,
		areInactiveAnswersDisplayed,
		hasNavigationBar,
		hasStatusBar,
		isFullScreen,
		pvtMinTime,
		pvtMaxTime,
		pvtCount,
		maxResponseTime,
		pvtTooEarlyMessage,
		pvtHasCentralElement,
		mainOptionText,
		matrixSizeX,
		matrixSizeY,
		matrixUsedCellsCount,
		presentationTime,
		stimuliTime,
		reproductionSeed,
	} = currentBlock;

	// Set the settings for the state. If no value is found, an appropreate default value is set
	currentState.settings = {
		anyPianoKey: 					typeof anyPianoKey === 'boolean' 					? anyPianoKey : generalSettings.anyPianoKey,
		enableSoundFlag: 				typeof enableSoundFlag === 'boolean' 				? enableSoundFlag : generalSettings.enableSoundFlag,
		playingMode: 					typeof playingMode === 'string' 					? playingMode : generalSettings.playingMode,
		timeoutInSeconds: 				typeof timeoutInSeconds === 'number' 				? timeoutInSeconds : 0,
		footnote: 						typeof footnote === 'boolean' 						? footnote : generalSettings.footnote,
		footnoteType: 					typeof footnoteType === 'string' 					? footnoteType : generalSettings.footnoteType,
		logFlag: 						typeof logFlag === 'boolean' 						? logFlag : generalSettings.logFlag,
		hideFeedbackSmiley: 			typeof hideFeedbackSmiley === 'boolean' 			? hideFeedbackSmiley : generalSettings.hideFeedbackSmiley,
		skipStepButton: 				typeof skipStepButton === 'string' 					? skipStepButton : '',
		skipStepButtonMessage: 			typeof skipStepButtonMessage === 'string' 			? skipStepButtonMessage : '',
		successFeedbackMessage: 		typeof successFeedbackMessage === 'string' 			? successFeedbackMessage : '',
		failureFeedbackMessage: 		typeof failureFeedbackMessage === 'string' 			? failureFeedbackMessage : '',
		footnoteMessage: 				typeof footnoteMessage === 'string' 				? footnoteMessage : '',
		melodyRepetition: 				typeof melodyRepetition === 'number' 				? melodyRepetition : 1,
		successesForSkipLoop: 			typeof successesForSkipLoop === 'number' 			? successesForSkipLoop : generalSettings.successesForSkipLoop,
		isSkipStepButtonInFootnote: 	typeof isSkipStepButtonInFootnote === 'boolean' 	? isSkipStepButtonInFootnote : generalSettings.isSkipStepButtonInFootnote,
		isSkipButtonInMainOptions:		typeof isSkipButtonInMainOptions === 'boolean'		? isSkipButtonInMainOptions : generalSettings.isSkipButtonInMainOptions,
		isGoBackButtonInFootnote: 		typeof isGoBackButtonInFootnote === 'boolean' 		? isGoBackButtonInFootnote : generalSettings.isGoBackButtonInFootnote,
		startSignal: 					typeof startSignal === 'number' 					? startSignal : 0,
		feedbackNumerical: 				typeof feedbackNumerical === 'boolean' 				? feedbackNumerical : false,
		interactivePianoFirstOctave: 	typeof interactivePianoFirstOctave === 'number' 	? interactivePianoFirstOctave : generalSettings.interactivePianoFirstOctave,
		skipLoopOnLastRepetition: 		typeof skipLoopOnLastRepetition === 'boolean' 		? skipLoopOnLastRepetition : false,
		canGoBack: 						typeof canGoBack === 'boolean' 						? canGoBack : false,
		goBackStepButton: 				typeof goBackStepButton === 'string' 				? goBackStepButton : '',
		goBackButtonMessage: 			typeof goBackButtonMessage === 'string' 			? goBackButtonMessage : '',
		checkpoint: 					typeof checkpoint === 'string' 						? checkpoint : false,
		strictPlay: 					typeof strictPlay === 'boolean' 					? strictPlay : false,
		skipIfNotMetSuccessGoal: 		typeof skipIfNotMetSuccessGoal === 'number' 		? skipIfNotMetSuccessGoal : 0,
		surveyType:						typeof surveyType === 'string'						? surveyType : '',
		surveyOptionsAreRadio: 			typeof surveyOptionsAreRadio === 'boolean' 			? surveyOptionsAreRadio : true,
		surveyAreAnswersMandatory: 		typeof surveyAreAnswersMandatory === 'boolean' 		? surveyAreAnswersMandatory : true,
		writtingMaxCharacters: 			typeof writtingMaxCharacters === 'number' 			? writtingMaxCharacters : 0,
		writtingMinCharacters: 			typeof writtingMinCharacters === 'number' 			? writtingMinCharacters : 100,
		writtingIsNumber: 				typeof writtingIsNumber === 'boolean' 				? writtingIsNumber : false,
		writtingIsMultiline: 			typeof writtingIsMultiline === 'boolean' 			? writtingIsMultiline : true,
		writtingTextPlaceHolder: 		typeof writtingTextPlaceHolder === 'string' 		? writtingTextPlaceHolder : '',
		questionType: 					typeof questionType === 'string' 					? questionType : generalSettings.questionType,
		areAnswerOptionsVertical: 		typeof areAnswerOptionsVertical === 'boolean' 		? areAnswerOptionsVertical : false,
		areInactiveAnswersDisplayed:	typeof areInactiveAnswersDisplayed === 'boolean' 	? areInactiveAnswersDisplayed : false,
		hasNavigationBar:				typeof hasNavigationBar === 'boolean'				? hasNavigationBar : generalSettings.hasNavigationBar,
		hasStatusBar:					typeof hasStatusBar === 'boolean'					? hasStatusBar : generalSettings.hasStatusBar,
		isFullScreen:					typeof isFullScreen === 'boolean'					? isFullScreen : generalSettings.isFullScreen,
		pvtMinTime:						typeof pvtMinTime === 'number' 						? pvtMinTime : 1000,
		pvtMaxTime:						typeof pvtMaxTime === 'number' 						? pvtMaxTime : 10000,
		pvtCount:						typeof pvtCount === 'number' 						? pvtCount : 1,
		maxResponseTime:				typeof maxResponseTime === 'number'					? maxResponseTime : 10000,
		pvtTooEarlyMessage:				typeof pvtTooEarlyMessage === 'string'				? pvtTooEarlyMessage : '',
		pvtHasCentralElement:			typeof pvtHasCentralElement === 'string'			? pvtHasCentralElement : true,
		mainOptionText: 				typeof mainOptionText === 'string'					? mainOptionText : '',
		matrixSizeX:					typeof matrixSizeX === 'number' 					? matrixSizeX : 2,
		matrixSizeY:					typeof matrixSizeY === 'number' 					? matrixSizeY : 2,
		matrixUsedCellsCount: 			typeof matrixUsedCellsCount === 'number' 			? matrixUsedCellsCount : -1,
		presentationTime:				typeof presentationTime === 'number' 				? presentationTime : 1000,
		stimuliTime:					typeof stimuliTime === 'number' 					? stimuliTime : 1000,
		reproductionSeed:				typeof reproductionSeed === 'string'				? reproductionSeed : generalSettings.reproductionSeed,
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
		audioFirst,
		audioSecond,
	} = currentBlock;

	// Using the values that are not set in an array if there are any
	let updatedMidiFileName = typeof midiFileName === 'string' ? midiFileName : null;
	let updatedVideoFileName = typeof videoFileName === 'string' ? videoFileName : null;
	let updatedaudioFirst = typeof audioFirst === 'string' ? audioFirst : null;
	let updatedaudioSecond = typeof audioSecond === 'string' ? audioSecond : null;

	let updatedReferenceKeyboardKeys = (Array.isArray(referenceKeyboardKeys) && referenceKeyboardKeys.every(key => (typeof key === 'string'))) ? referenceKeyboardKeys : null;

	// Update the media files. If no new value is found, the previous value is used (it is kept unchanged)
	const mediaIndex = cursor.current.piledContentIndex;

	if (Array.isArray(midiFileName)) updatedMidiFileName = midiFileName[mediaIndex];
	if (Array.isArray(videoFileName)) updatedVideoFileName = videoFileName[mediaIndex];
	if (Array.isArray(audioFirst)) updatedaudioFirst = audioFirst[mediaIndex];
	if (Array.isArray(audioSecond)) updatedaudioSecond = audioSecond[mediaIndex];
	if (referenceKeyboardKeys && Array.isArray(referenceKeyboardKeys[mediaIndex])) updatedReferenceKeyboardKeys = referenceKeyboardKeys[mediaIndex];

	const updatedInteractiveKeyboardTextMapping = Array.isArray(interactiveKeyboardTextMapping) ? interactiveKeyboardTextMapping[mediaIndex] || false : false;

	// If the midifileName is specified (whether it is new or not), we also reset the virtual piano's text
	const oldMediaFile = currentState.mediaFile;
	if (updatedMidiFileName) oldMediaFile.interactiveKeyboardTextMapping = null;

	// We adjust the current state and keep the previous value if no new value is provided
	currentState.mediaFile.midiName = updatedMidiFileName || oldMediaFile.midiName;
	currentState.mediaFile.videoName = updatedVideoFileName || oldMediaFile.videoName;
	currentState.mediaFile.audioFirst = updatedaudioFirst || oldMediaFile.audioFirst;
	currentState.mediaFile.audioSecond = updatedaudioSecond || oldMediaFile.audioSecond;
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
		interactiveClicker,
		interactiveKeyboard,
		textAfterQuestionAsked,
		textSpecification,
		textBeforeMainContent,
		textAfterAnswerReceived,
	} = currentBlock;

	// Using the values that are not set in an array if there are any
	let updatedTextContent = typeof textContent === 'string' ? textContent : null;
	let updatedPictureFileName = typeof pictureFileName === 'string' ? pictureFileName : null;
	let updatedHelperImageFileName = typeof helperImageFileName === 'string' ? helperImageFileName : null;
	let updatedTextReminder = typeof textReminder === 'string' ? textReminder : null;
	let updatedInteractivePiano = typeof interactivePiano === 'string' || typeof interactivePiano === 'boolean' ? interactivePiano : null;
	let updatedInteractiveClicker = typeof interactiveClicker === 'string' || typeof interactiveClicker === 'boolean' ? interactiveClicker : null;
	let updatedInteractiveKeyboard = typeof interactiveKeyboard === 'string' || typeof interactiveKeyboard === 'boolean' ? interactiveKeyboard : null;
	let updatedTextAfterQuestionAsked = typeof textAfterQuestionAsked === 'string' ? textAfterQuestionAsked : null;
	let updatedTextBeforeMainContent = typeof textBeforeMainContent === 'string' ? textBeforeMainContent : null;
	let updatedTextAfterAnswerReceived = typeof textAfterAnswerReceived === 'string' ? textAfterAnswerReceived : null;
	let updatedTextSpecification = typeof textSpecification === 'string' ? textSpecification : null;

	// If the value is in an array
	const piledContentIndex = cursor.current.piledContentIndex;

	if (Array.isArray(textContent)) updatedTextContent = textContent[piledContentIndex] || null;
	if (Array.isArray(pictureFileName)) updatedPictureFileName = pictureFileName[piledContentIndex] || null;
	if (Array.isArray(helperImageFileName)) updatedHelperImageFileName = helperImageFileName[piledContentIndex] || null;
	if (Array.isArray(textReminder)) updatedTextReminder = textReminder || null;
	if (Array.isArray(interactivePiano)) updatedInteractivePiano = interactivePiano[piledContentIndex] || null;
	if (Array.isArray(interactiveClicker)) updatedInteractiveClicker = interactiveClicker[piledContentIndex] || null;
	if (Array.isArray(interactiveKeyboard)) updatedInteractiveKeyboard = interactiveKeyboard[piledContentIndex] || null;
	if (Array.isArray(textAfterQuestionAsked)) updatedTextAfterQuestionAsked = textAfterQuestionAsked || null;
	if (Array.isArray(textBeforeMainContent)) updatedTextBeforeMainContent = textBeforeMainContent || null;
	if (Array.isArray(textAfterAnswerReceived)) updatedTextAfterAnswerReceived = textAfterAnswerReceived || null;
	if (Array.isArray(textSpecification)) updatedTextSpecification = textSpecification || null;

	// If the value is in a nested array
	const innerStepIndex = cursor.current.innerStepIndex;

	if (Array.isArray(updatedTextContent)) updatedTextContent = updatedTextContent[innerStepIndex];
	if (Array.isArray(updatedPictureFileName)) updatedPictureFileName = updatedPictureFileName[innerStepIndex];
	if (Array.isArray(updatedHelperImageFileName)) updatedHelperImageFileName = updatedHelperImageFileName[innerStepIndex];
	if (Array.isArray(updatedTextReminder)) updatedTextReminder = updatedTextReminder[innerStepIndex];
	if (Array.isArray(updatedInteractivePiano)) updatedInteractivePiano = updatedInteractivePiano[innerStepIndex];
	if (Array.isArray(updatedInteractiveClicker)) updatedInteractiveClicker = updatedInteractiveClicker[innerStepIndex];
	if (Array.isArray(updatedInteractiveKeyboard)) updatedInteractiveKeyboard = updatedInteractiveKeyboard[innerStepIndex];
	if (Array.isArray(updatedTextAfterQuestionAsked)) updatedTextAfterQuestionAsked = textAfterQuestionAsked || null;
	if (Array.isArray(updatedTextBeforeMainContent)) updatedTextBeforeMainContent = textBeforeMainContent || null;
	if (Array.isArray(updatedTextAfterAnswerReceived)) updatedTextAfterAnswerReceived = textAfterAnswerReceived || null;
	if (Array.isArray(updatedTextSpecification)) updatedTextSpecification = textSpecification || null;

	// === Update the state ===
	// Elements which support the shorthand notation with array nesting
	currentState.content.text = updatedTextContent || '';
	currentState.content.pictureName = updatedPictureFileName || '';
	currentState.content.helperImageName = updatedHelperImageFileName || '';
	currentState.content.textReminder = updatedTextReminder || '';
	currentState.content.interactivePiano = updatedInteractivePiano || false;
	currentState.content.interactiveClicker = updatedInteractiveClicker || false;
	currentState.content.interactiveKeyboard = updatedInteractiveKeyboard || false;
	currentState.content.textAfterQuestionAsked = updatedTextAfterQuestionAsked || '';
	currentState.content.textBeforeMainContent = updatedTextBeforeMainContent || '';
	currentState.content.textAfterAnswerReceived = updatedTextAfterAnswerReceived || '';
	currentState.content.textSpecification = updatedTextSpecification || '';

	// Indicate that the media files is initialized
	Object.assign(isInitialized, { content: true });
}

function updateStateOptionsContent(currentState, targetState, isInitialized) {
	// Parsing the current block
	const currentBlock = targetState; // Flow[cursor.current.index];
	const {
		surveyInputOptionsValues,
		surveyInputOptionsText,
		surveyLeftSideText,
		surveyRightSideText,

		answerChoicesValue,
		answerChoicesText,
		answerChoicesColor,
		answerChoicesImage,

		rightAnswers,
	} = currentBlock;

	// Parsing the parameters that support single value input
	const defaultAnswerChoicesColor = typeof answerChoicesColor === 'string' ? answerChoicesColor : [];
	const defaultRightAnswer = typeof rightAnswers === 'number' ? rightAnswers : null;

	// Parsing the survey parameters (they do no support short notations through nesting)
	currentState.optionsContent.surveyInputOptionsValues = (Array.isArray(surveyInputOptionsValues)) ? surveyInputOptionsValues : [];
	currentState.optionsContent.surveyInputOptionsValues = (Array.isArray(surveyInputOptionsText)) ? surveyInputOptionsText : [];
	currentState.optionsContent.surveyLeftSideText = (Array.isArray(surveyLeftSideText)) ? surveyLeftSideText : [];
	currentState.optionsContent.surveyRightSideText = (Array.isArray(surveyRightSideText)) ? surveyRightSideText : [];

	currentState.optionsContent.answerChoicesValue = (Array.isArray(answerChoicesValue)) ? answerChoicesValue : [];
	currentState.optionsContent.answerChoicesText = (Array.isArray(answerChoicesText)) ? answerChoicesText : [];
	currentState.optionsContent.answerChoicesColor = (Array.isArray(answerChoicesColor)) ? answerChoicesColor : defaultAnswerChoicesColor;
	currentState.optionsContent.answerChoicesImage = (Array.isArray(answerChoicesImage)) ? answerChoicesImage : [];

	currentState.optionsContent.rightAnswers = (Array.isArray(rightAnswers)) ? rightAnswers : defaultRightAnswer;

	// Indicate that the media files is initialized
	Object.assign(isInitialized, { options: true });
}
