export default {
	UNSET_INDEX,
	DEFAULT_ANY_PIANO_KEY,
	DEFAULT_ENABLE_SOUND_FLAG,
	DEFAULT_PLAYING_MODE,
	DEFAULT_TIMBRE_FILE,
	DEFAULT_FOOTNOTE,
	DEFAULT_TIME_LIMIT,
	DEFAULT_LOG_FLAG,
	DEFAULT_SUCCESSES_FOR_SKIP,
	DEFAULT_HIDE_FEEDBACK_SMILEY,
	DEFAULT_EXPERIMENT_STATE_VALUES,
	DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES,
	DEFAULT_EXPERIMENT_STATE_CURSOR_VALUES,
	DEFAULT_EXPERIMENT_VARIABLE_VALUES,
	IS_FULLY_NOT_INITIALIZED_STATUS,
};

// Default value
const UNSET_INDEX = -1;

// Default settings values
const DEFAULT_ANY_PIANO_KEY = false;
const DEFAULT_ENABLE_SOUND_FLAG = false;
const DEFAULT_PLAYING_MODE = 'rhythm';
const DEFAULT_TIMBRE_FILE = 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-ogg.js';
const DEFAULT_FOOTNOTE = false;
const DEFAULT_FOOTNOTE_TYPE = 'simple';
const DEFAULT_TIME_LIMIT = 0;
const DEFAULT_LOG_FLAG = true;
const DEFAULT_SUCCESSES_FOR_SKIP = 0;
const DEFAULT_HIDE_FEEDBACK_SMILEY = false;
const DEFAULT_IS_SKIP_BUTTON_IN_FOOTNOTE = false;
const DEFAULT_PROGRAMMED_OCTAVE_OFFSET = 0;
const DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE = 4;

function DEFAULT_EXPERIMENT_STATE_VALUES() {
	return {
		// Indicator of wether or not the experiment was set
		_id: null, // Id of the experiment
		hasExperiment: false, // Indicator of whether or not an experiment was parsed

		// The sequence of the experiment
		flow: [], // Description of the different steps of the experiment

		// Mandatory description of the flow
		description: {
			name: '', // Name of the experiment
			folder: '', // Folder in which the resources for the experiment are located
			group: '', // Group of the experiment
			version: 0, // Version of the experiment
		},

		// General settings of the flow
		settings: DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES(),

		// Data to navigate through the flow
		cursor: DEFAULT_EXPERIMENT_STATE_CURSOR_VALUES(),

		// Data used by the view pages
		state: DEFAULT_EXPERIMENT_STATE_STATE_VALUES(),

		// Variables used in the experiment
		variables: DEFAULT_EXPERIMENT_VARIABLE_VALUES(),

		// Initialization status of vue pages
		isInitialized: IS_FULLY_NOT_INITIALIZED_STATUS(),
	};
}

function DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES() {
	return {
		anyPianoKey: DEFAULT_ANY_PIANO_KEY, // Allowing any piano key press to advance to the next page
		enableSoundFlag: DEFAULT_ENABLE_SOUND_FLAG, // Whether or not the piano output is enabled by default in the session
		playingMode: DEFAULT_PLAYING_MODE, // Mode of the experiment ("rhythm" or "speed")
		timbreFile: DEFAULT_TIMBRE_FILE, // URL or location of the timbre file used for the piano
		footnote: DEFAULT_FOOTNOTE, // Whether or not the experiment must display the inidcative foot note in each state
		footnoteType: DEFAULT_FOOTNOTE_TYPE, // Whether the footnote is made of simple text or buttons
		timeLimitInSeconds: DEFAULT_TIME_LIMIT, // Time limit of the experiment. If set to 0, ther is no limit and the timer will count up, otherwise the timer will count down
		logFlag: DEFAULT_LOG_FLAG, // Indicate wether or not the blocks must log it's data
		successesForSkip: DEFAULT_SUCCESSES_FOR_SKIP, // Indicate the number of successful 'Playing' states before being able to leave a group of blocks
		hideFeedbackSmiley: DEFAULT_HIDE_FEEDBACK_SMILEY, // Indicate whether the feedback state contains a smiley by default
		isSkipStepButtonInFootnote: DEFAULT_IS_SKIP_BUTTON_IN_FOOTNOTE, // Indicates wether the skip buttons are displayed by default in the footnote when there is a button footnote
		programmedOctaveOffset: DEFAULT_PROGRAMMED_OCTAVE_OFFSET, // Indicates a preset octave shift for the midi piano (knowing that most midi piano are on octave 3 by default)
		interactivePianoFirstOctave: DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE, // Indicate the first octave from which the notes must be displayed on the interactive piano (which has 2 octaves)
	};
}

function DEFAULT_EXPERIMENT_STATE_CURSOR_VALUES() {
	return {
		current: {
			index: 0, // Index of the current block of the flow
			piledContentIndex: 0, // Index of the current step of the block (browses the midi and video file names)
			innerStepIndex: 0, // Index of the current step of the block (browses the picture file names)
			isBeyondEnd: false, // Indicator of whether the index as reached the end of the flow (is checked before moving the cursor forward)
			isInSkipableChain: false, // Indicates whether the block must be skipped upon a skip request
		},
		navigation: {
			indexNext: 1, // Index of the next block of the flow
			indexLoopStart: UNSET_INDEX, // Index to which a loop start
			indexPileStart: UNSET_INDEX, // Index to which there remains content to depile
			indexGroupEnd: UNSET_INDEX, // Index of the end of a group of blocks (the last index with a followedBy or an individual block)
			totalInnerSteps: 0, // Number of steps in a given block
			numberRepetition: 1, // Number of repetitions left to do
			numberPiledMedia: 0, // Number of media content piled at the index pile start
		},
		flag: {
			needsResetLoopParameters: false, // Indicator of whether he loop specific parameters need to be restarted (only when we enter a need block)
		},
	};
}

function DEFAULT_EXPERIMENT_STATE_STATE_VALUES() {
	return {
		type: '', // Type of the current state
		// Displayable content elements
		content: {
			text: '', // Text to display
			pictureName: '', // Name of the current picture to display
			helperImageName: '', // Name of the helper image to display
			interactivePiano: false, // <Boolean|String> Directive to display the interactive piano
		},
		// Multimedia elements
		mediaFile: {
			midiName: '', // Name of the current midi file loaded in the player to play
			videoName: '', // Name of the current video file to playback
		},
		// Block specific settings
		settings: {
			anyPianoKey: DEFAULT_ANY_PIANO_KEY, // Block specific "anyPianoLKey" superseding the general setting
			enableSoundFlag: DEFAULT_ENABLE_SOUND_FLAG, // Block specific "enableSoundFlag" superseding the general setting
			numberRepetition: 0, // Number of repetitions of a block group
			timeoutInSeconds: 0, // Time limit for a given block
			playingMode: DEFAULT_PLAYING_MODE, // Playing mode ("rhythm" or "speed")
			footnote: DEFAULT_FOOTNOTE, // Block specific "footnote" superseding the general setting
			footnoteType: DEFAULT_FOOTNOTE_TYPE, // Block specific "footnoteType" superseding the general setting
			logFlag: DEFAULT_LOG_FLAG, // Block specific "logFlag" superseding the general setting
			skipStepButton: '', // Button to press to skip the next block (is valid only if a button is specified)
			isSkipStepButtonInFootnote: DEFAULT_IS_SKIP_BUTTON_IN_FOOTNOTE, // Block specific isSkipStepButtonInFootnote superceeding the general parameter
			skipStepButtonMessage: '', // Message indicated on the skip button if there is a skip button
			successFeedbackMessage: '', // Additional message displayed upon sucessfull feedback for all criteras
			failureFeedbackMessage: '', // Additional message displayed upon feedback with at least one failed critera
			melodyRepetition: 1, // Number of times a melody is repeated in a block
			successesForSkip: DEFAULT_SUCCESSES_FOR_SKIP, // Block specific "successesForSkip" superseding the general setting
			startSignal: 0, // Signal countdown (if is 0, there is no signal countdown)
			feedbackNumerical: false, // Indicator of whether the feedback must be given in its numerical form instead of with range bars
			interactivePianoFirstOctave: DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE, // Block specific "interactivePianoFirstOctave" superseding the general setting
		},
		// Session specific informations
		record: {
			sucesses: 0, // Number of successes recorded
			successesInLoop: 0, // Number of successes recorded in the loop
			isSuccess: false, // Indicate whether the current step was a success
			isWaitingReadyStartSignal: false, // Indicate whether a 'Ready Start' signal is being awaited
		},
	};
}

function DEFAULT_EXPERIMENT_VARIABLE_VALUES() {
	return {
		value: {}, // Value of the variable
		initial: {}, // Initial value assigned to the variable
	};
}

function IS_FULLY_NOT_INITIALIZED_STATUS() {
	return {
		route: false, // Flag indicating whether the route needs to be updated
		record: false, // Flag indicating whether the session specific information needs to be updated
		state: false, // Flag indicating whether the state's settings need to be opdated
		media: false, // Flag indicating whether the state's media files need to be updated
		content: false, // Flag indicating whether the state's content need to be updated
	};
}
