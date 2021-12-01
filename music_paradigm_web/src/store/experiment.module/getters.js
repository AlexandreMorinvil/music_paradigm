/* eslint-disable max-lines */
import { cursorHandler, defaultState } from '@/store-helper/experiment.module-helper';

export default {
	experimentId: (state) => {
		return state._id;
	},

	// Session state
	cursor: (state) => {
		return state.cursor;
	},

	state: (state) => {
		return state.state;
	},

	initialTimeInSeconds: (state) => {
		return state.initialTimeIndicated;
	},

	timeIndicated: (state) => {
		return state.state.record.timeIndicatedInMilliseconds;
	},

	// Getters for the experiment flow's information
	isInTimeUp: (state) => {
		return state.cursor.flag.isInTimeUp;
	},

	isInPrelude: (state) => {
		return state.cursor.flag.isInPrelude;
	},

	stepsTotalCount: (state) => {
		return cursorHandler.countStepsLeft(state.flow);
	},

	stepsLeftCount: (state) => {
		return cursorHandler.countStepsLeft(state.flow, state.cursor);
	},

	isBeyondEnd: (state) => {
		return state.cursor.flag.isBeyondEnd;
	},

	currentIndex: (state) => {
		return state.cursor.current.index;
	},

	currentInnerStepIndex: (state) => {
		return state.cursor.current.innerStepIndex;
	},

	currentRepetition: (state) => {
		const totalRepetitions = state.cursor.navigation.totalNumberRepetitions;
		const repetitionsLeft = state.cursor.current.numberRepetition;
		return totalRepetitions - repetitionsLeft + 1;
	},

	isFirstIndexPassage: (state) => {
		return state.cursor.flag.isFirstIndexPassage;
	},

	needsResetLoopParameters: (state) => {
		return state.cursor.flag.needsResetLoopParameters;
	},

	isNewBlock: (state) => {
		return state.cursor.flag.isNewBlock;
	},

	// Getters for the experiment settings
	experimentGroup: (state) => {
		return state.description.group || 'UNKNOWN_GROUP';
	},

	experimentName: (state) => {
		return state.description.name || 'UNKNOWN_NAME';
	},

	experimentVersion: (state) => {
		return state.description.version || 0;
	},

	instrument: (state) => {
		return state.settings.instrument || defaultState.DEFAULT_INSTRUMENT;
	},

	timeLimitInSeconds: (state) => {
		return state.settings.timeLimitInSeconds || 0;
	},

	// Getters for the state content
	// Texts
	textContent: (state) => {
		return state.state.content.text;
	},

	// Image files
	pictureName: (state) => {
		// Fetch the picture name
		const pictureName = state.state.content.pictureName;
		if (!pictureName) return '';

		// Return the picture name
		return `${state.description.folder}/${pictureName}`;
	},

	helperImageName: (state) => {
		// Fetch the helper image name
		const pictureName = state.state.content.helperImageName;
		if (!pictureName) return '';
		else return `${state.description.folder}/${pictureName}`;
	},

	// Interactive piano
	interactivePiano: (state) => {
		return state.state.content.interactivePiano || false;
	},

	interactiveKeyboardTextMapping: (state) => {
		return state.state.mediaFile.interactiveKeyboardTextMapping || null;
	},

	interactiveKeyboard: (state) => {
		return state.state.content.interactiveKeyboard || false;
	},

	// Survey parameters
	surveyInputOptionsValues: (state) => {
		return state.state.content.surveyInputOptionsValues;
	},

	surveyInputOptionsText: (state) => {
		return state.state.content.surveyInputOptionsText;
	},

	surveyLeftSideText: (state) => {
		return state.state.content.surveyLeftSideText;
	},

	surveyRightSideText: (state) => {
		return state.state.content.surveyRightSideText;
	},

	// Getters for the state media
	// Playable Media file names
	midiName: (state) => {
		// Fetch the picture name
		const midiName = state.state.mediaFile.midiName;
		if (!midiName) return '';

		// Return the picture name
		return `${state.description.folder}/${midiName}`;
	},

	videoName: (state) => {
		// Fetch the video name
		const videoName = state.state.mediaFile.videoName;
		if (!videoName) return '';

		// Return the video name
		return `${state.description.folder}/${videoName}`;
	},

	referenceKeyboardKeys: (state) => {
		return state.state.mediaFile.referenceKeyboardKeys;
	},

	// Geters for the state attributes
	currentStateType: (state) => {
		// Return the type of the current state
		if (state.cursor.flag.isBeyondEnd) {
			return 'end';
		}
		return state.state.type || '';
	},

	anyPianoKey: (state) => {
		// The "anyPianoKey" parameter indicates whether the user of the experiment can move to the next step by pressing any piano key
		// (if the value is "true"), otherwise the experiment will move to the next step only by pressing the space bar key (if the value is false).
		let anyPianoKey = false;

		if (typeof state.state.settings.anyPianoKey === 'boolean') anyPianoKey = state.state.settings.anyPianoKey;
		else if (typeof state.settings.anyPianoKey === 'boolean') anyPianoKey = state.settings.anyPianoKey;
		else anyPianoKey = defaultState.DEFAULT_ANY_PIANO_KEY;

		return anyPianoKey;
	},

	playingMode: (state) => {
		// Return the playing mode specified by the block if it exists, otherwise, the default playing mode of the experiment is returned.
		let playingMode = defaultState.DEFAULT_PLAYING_MODE;

		if (typeof state.state.settings.playingMode === 'string') playingMode = state.state.settings.playingMode;
		else if (typeof state.settings.playingMode === 'string') playingMode = state.settings.playingMode;

		return playingMode;
	},

	enableSoundFlag: (state) => {
		// Return whether or not the piano output is enabled.
		let enableSoundFlag = defaultState.DEFAULT_ENABLE_SOUND_FLAG;

		if (state.state.type === 'playing') enableSoundFlag = true;
		else if (typeof state.state.settings.enableSoundFlag === 'boolean') enableSoundFlag = state.state.settings.enableSoundFlag;
		else if (typeof state.settings.enableSoundFlag === 'boolean') enableSoundFlag = state.settings.enableSoundFlag;

		return enableSoundFlag;
	},

	interactivePianoFirstOctave: (state) => {
		let interactivePianoFirstOctave = defaultState.DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE;
		if (typeof state.state.settings.interactivePianoFirstOctave === 'number')
			interactivePianoFirstOctave = state.state.settings.interactivePianoFirstOctave;
		else if (typeof state.settings.interactivePianoFirstOctave === 'number') interactivePianoFirstOctave = state.settings.interactivePianoFirstOctave;
		return interactivePianoFirstOctave;
	},

	timeoutInSeconds: (state) => {
		// Return the the timeout time specified by the block if it exists, otherwise, return a value of 0 to be interpreted as "There is no timeout"
		return state.state.settings.timeoutInSeconds || 0;
	},

	startSignal: (state) => {
		return state.state.settings.startSignal || 0;
	},

	goBackStepButton: (state) => {
		return state.state.settings.goBackStepButton.toLowerCase() || '';
	},

	goBackButtonMessage: (state) => {
		return state.state.settings.goBackButtonMessage || '';
	},

	skipStepButton: (state) => {
		return state.state.settings.skipStepButton.toLowerCase() || '';
	},

	skipStepButtonMessage: (state) => {
		return state.state.settings.skipStepButtonMessage || '';
	},

	feedbackNumerical: (state) => {
		return state.state.settings.feedbackNumerical || false;
	},

	successFeedbackMessage: (state) => {
		return state.state.settings.successFeedbackMessage || '';
	},

	failureFeedbackMessage: (state) => {
		return state.state.settings.failureFeedbackMessage || '';
	},

	footnoteMessage: (state) => {
		return state.state.settings.footnoteMessage || '';
	},

	melodyRepetition: (state) => {
		return state.state.settings.melodyRepetition || 1;
	},

	hideFeedbackSmiley: (state) => {
		let hideFeedbackSmiley = defaultState.DEFAULT_HIDE_FEEDBACK_SMILEY;
		if (typeof state.state.settings.hideFeedbackSmiley === 'boolean') hideFeedbackSmiley = state.state.settings.hideFeedbackSmiley;
		else if (typeof state.settings.hideFeedbackSmiley === 'boolean') hideFeedbackSmiley = state.settings.hideFeedbackSmiley;
		return hideFeedbackSmiley;
	},

	footnoteType: (state) => {
		let footnoteType = defaultState.DEFAULT_FOOTNOTE_TYPE;
		if (typeof state.state.settings.footnoteType === 'string') footnoteType = state.state.settings.footnoteType;
		else if (typeof state.settings.footnoteType === 'string') footnoteType = state.settings.footnoteType;
		return footnoteType;
	},

	midiOffset: (state) => {
		const NOTES_PER_OCTAVE = 12;
		return state.settings.programmedOctaveOffset * NOTES_PER_OCTAVE;
	},

	controlType: (state) => {
		return state.settings.controlType || defaultState.DEFAULT_CONTROL_TYPE;
	},

	checkpoint: (state) => {
		return state.state.settings.checkpoint || '';
	},

	strictPlay: (state) => {
		return state.state.settings.strictPlay || false;
	},

	relativeRhythmImportance: (state) => {
		let relativeRhythmImportance = state.settings.relativeRhythmImportance;
		if (typeof state.settings.relativeRhythmImportance !== 'number') relativeRhythmImportance = defaultState.DEFAULT_RELATIVE_RHYTHM_IMPORTANCE;
		if (relativeRhythmImportance < 0) return 0;
		else if (relativeRhythmImportance > 1) return 1;
		else return relativeRhythmImportance;
	},

	rhythmErrorMarginInMilliseconds: (state) => {
		return Math.max(0, state.settings.rhythmErrorMarginInMilliseconds);
	},

	rhythmRelativeErrorMarginInFloat: (state) => {
		return Math.max(0, state.settings.rhythmRelativeErrorMarginInFloat);
	},

	withProgressionBar: (state) => {
		let withProgressionBar = defaultState.DEFAULT_WITH_PROGRESSION_BAR;
		if (typeof state.settings.withProgressionBar === 'boolean') withProgressionBar = state.settings.withProgressionBar;
		return withProgressionBar;
	},

	considerExperimentFinished: (state) => {
		return state.state.record.considerExperimentFinished;
	},

	logLabel: (state) => {
		return state.state.record.logLabel;
	},

	cueWaitForClick: (state) => {
		return state.settings.cueWaitForClick;
	},

	surveyOptionsAreRadio: (state) => {
		return state.state.settings.surveyOptionsAreRadio;
	},

	surveyAreAnswersMandatory: (state) => {
		return state.state.settings.surveyAreAnswersMandatory;
	},

	writtingMaxCharacters: (state) => {
		return state.state.settings.writtingMaxCharacters;
	},

	writtingMinCharacters: (state) => {
		return state.state.settings.writtingMinCharacters;
	},

	writtingIsNumber: (state) => {
		return state.state.settings.writtingIsNumber;
	},

	writtingIsMultiline: (state) => {
		return state.state.settings.writtingIsMultiline;
	},

	writtingTextPlaceHolder: (state) => {
		return state.state.settings.writtingTextPlaceHolder;
	},

	// Getters used for the content disposition on the screen
	hasFootnote: (state) => {
		let hasFootNote = defaultState.DEFAULT_FOOTNOTE;
		if (typeof state.state.settings.footnote === 'boolean') hasFootNote = state.state.settings.footnote;
		else if (typeof state.settings.footnote === 'boolean') hasFootNote = state.settings.footnote;
		return hasFootNote;
	},

	hasText: (state) => {
		return Boolean(state.state.content.text);
	},

	hasVideo: (state) => {
		return Boolean(state.state.mediaFile.videoName);
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
