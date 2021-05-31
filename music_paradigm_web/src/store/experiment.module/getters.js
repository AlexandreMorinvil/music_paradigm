import constants from './constants';

import cursorHandler from './flow-helper/cursor-handler';

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

	timbreFile: (state) => {
		return state.settings.timbreFile || constants.DEFAULT_TIMBRE_FILE;
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
		else anyPianoKey = constants.DEFAULT_ANY_PIANO_KEY;

		return anyPianoKey;
	},

	playingMode: (state) => {
		// Return the playing mode specified by the block if it exists, otherwise, the default playing mode of the experiment is returned.
		let playingMode = constants.DEFAULT_PLAYING_MODE;

		if (typeof state.state.settings.playingMode === 'string') playingMode = state.state.settings.playingMode;
		else if (typeof state.settings.playingMode === 'string') playingMode = state.settings.playingMode;

		return playingMode;
	},

	enableSoundFlag: (state) => {
		// Return whether or not the piano output is enabled.
		let enableSoundFlag = constants.DEFAULT_ENABLE_SOUND_FLAG;

		if (state.state.type === 'playing') enableSoundFlag = true;
		else if (typeof state.state.settings.enableSoundFlag === 'boolean') enableSoundFlag = state.state.settings.enableSoundFlag;
		else if (typeof state.settings.enableSoundFlag === 'boolean') enableSoundFlag = state.settings.enableSoundFlag;

		return enableSoundFlag;
	},

	interactivePianoFirstOctave: (state) => {
		let interactivePianoFirstOctave = constants.DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE;
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
		let hideFeedbackSmiley = constants.DEFAULT_HIDE_FEEDBACK_SMILEY;
		if (typeof state.state.settings.hideFeedbackSmiley === 'boolean') hideFeedbackSmiley = state.state.settings.hideFeedbackSmiley;
		else if (typeof state.settings.hideFeedbackSmiley === 'boolean') hideFeedbackSmiley = state.settings.hideFeedbackSmiley;
		return hideFeedbackSmiley;
	},

	footnoteType: (state) => {
		let footnoteType = constants.DEFAULT_FOOTNOTE_TYPE;
		if (typeof state.state.settings.footnoteType === 'string') footnoteType = state.state.settings.footnoteType;
		else if (typeof state.settings.footnoteType === 'string') footnoteType = state.settings.footnoteType;
		return footnoteType;
	},

	midiOffset: (state) => {
		const NOTES_PER_OCTAVE = 12;
		return state.settings.programmedOctaveOffset * NOTES_PER_OCTAVE;
	},

	controlType: (state) => {
		return state.settings.controlType || constants.DEFAULT_CONTROL_TYPE;
	},

	checkpoint: (state) => {
		return state.state.settings.checkpoint || '';
	},

	strictPlay: (state) => {
		return state.state.settings.strictPlay || false;
	},

	relativeRhythmImportance: (state) => {
		let relativeRhythmImportance = state.settings.relativeRhythmImportance;
		if (typeof state.settings.relativeRhythmImportance !== 'number') relativeRhythmImportance = constants.DEFAULT_RELATIVE_RHYTHM_IMPORTANCE;
		if (relativeRhythmImportance < 0) return 0;
		else if (relativeRhythmImportance > 1) return 1;
		else return relativeRhythmImportance;
	},

	withProgressionBar: (state) => {
		let withProgressionBar = constants.DEFAULT_WITH_PROGRESSION_BAR;
		if (typeof state.settings.withProgressionBar === 'boolean') withProgressionBar = state.settings.withProgressionBar;
		return withProgressionBar;
	},

	considerExperimentFinished: (state) => {
		return state.state.record.considerExperimentFinished;
	},

	// Getters used for the content disposition on the screen
	hasFootnote: (state) => {
		let hasFootNote = constants.DEFAULT_FOOTNOTE;
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
