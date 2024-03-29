/* eslint-disable max-lines-per-function */
export default {
	UNSET_INDEX,
	DEFAULT_ANY_PIANO_KEY,
	DEFAULT_ENABLE_SOUND_FLAG,
	DEFAULT_PLAYING_MODE,
	DEFAULT_FOOTNOTE,
	DEFAULT_TIME_LIMIT,
	DEFAULT_LOG_FLAG,
	DEFAULT_SUCCESSES_FOR_SKIP,
	DEFAULT_HIDE_FEEDBACK_SMILEY,
	DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE,
	DEFAULT_CONTROL_TYPE,
	DEFAULT_RELATIVE_RHYTHM_IMPORTANCE,
	DEFAULT_WITH_PROGRESSION_BAR,
	DEFAULT_EXPERIMENT_STATE_VALUES,
	DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES,
	DEFAULT_EXPERIMENT_STATE_CURSOR_VALUES,
	DEFAULT_EXPERIMENT_VARIABLE_VALUES,
	DEFAULT_EXPERIMENT_STATE_STATE_VALUES,
	DEFAULT_KEYBOARD_TO_MIDI_INPUT_MAPPING,
	IS_FULLY_NOT_INITIALIZED_STATUS,
};

// Default value
const UNSET_INDEX = -1;

// Default settings values
const DEFAULT_ANY_PIANO_KEY = false;
const DEFAULT_CUE_PRESENTATION_DELAY = 0;
const DEFAULT_ENABLE_SOUND_FLAG = false;
const DEFAULT_PLAYING_MODE = 'rhythm';
const DEFAULT_FOOTNOTE = false;
const DEFAULT_FOOTNOTE_TYPE = 'simple';
const DEFAULT_TIME_LIMIT = 0;
const DEFAULT_LOG_FLAG = true;
const DEFAULT_SUCCESSES_FOR_SKIP = 0;
const DEFAULT_HIDE_FEEDBACK_SMILEY = false;
const DEFAULT_IS_SKIP_BUTTON_IN_FOOTNOTE = false;
const DEFAULT_IS_SKIP_BUTTON_IN_MAIN_OPTIONS = false;
const DEFAULT_IS_GO_BACK_BUTTON_IN_FOOTNOTE = false;
const DEFAULT_PROGRAMMED_OCTAVE_OFFSET = 0;
const DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE = 4;
const DEFAULT_CONTROL_TYPE = 'piano';
const DEFAULT_RELATIVE_RHYTHM_IMPORTANCE = 0;
const DEFAULT_RHYTHM_ERROR_MARGIN_IN_MILLISECONDS = 0;
const DEFAULT_RHYTHM_RELATIVE_ERROR_MARGIN_IN_FLOAT = 0;
const DEFAULT_WITH_PROGRESSION_BAR = true;
const DEFAULT_LOG_LABEL = 'default';
const DEFAULT_CUE_WAIT_FOR_CLICK = false;
const DEFAULT_INSTRUMENT = 'piano';
const DEFAULT_QUESTION_TYPE = 'simple';
const DEFAULT_HAS_TIMER = true;
const DEFAULT_HAS_CLEAR_BACKGROUND = false;
const DEFAULT_HAS_SOUND = true;
const DEFAULT_TIME_LEFT_MESSAGES = {};
const DEFAULT_HAS_NAVIGATION_BAR = true;
const DEFAULT_STAUS_BAR = true;
const DEFAULT_IF_FULL_SCREEN = false;
const DEFAULT_REPRODUCTION_SEED = null;
const DEFAULT_MUST_KEEP_MARKER_AFTFER_END = false;


function DEFAULT_EXPERIMENT_STATE_VALUES() {
	return {
		// Indicator of wether or not the experiment was set
		_id: null, // Id of the experiment

		// The prelude sequence of the experiment
		flowPrelude: [], // Those steps are done before accessing the main flow

		// The conclusion sequence of the experiment
		flowConclusion: [], // Those steps are allways put at the end of a session (when the end is reached or through a timeout)

		// The sequence of the experiment
		flow: [], // Description of the different steps of the experiment

		// The state to reach upon timeout
		timeUpState: null,

		// Initial Time
		initialTimeIndicated: 0,

		// Mandatory description of the flow
		description: DEFAULT_DESCRIPTION_SETTINGS_VALUES(),

		// General settings of the flow
		settings: DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES(),

		// Data to navigate through the flow
		cursor: DEFAULT_EXPERIMENT_STATE_CURSOR_VALUES(),

		// Data used by the view pages
		state: DEFAULT_EXPERIMENT_STATE_STATE_VALUES(),

		// Mapping between the computer keyboard and the midi keyboard
		keyboardToMidiInputMapping: DEFAULT_KEYBOARD_TO_MIDI_INPUT_MAPPING(),

		// Variables used in the experiment
		variablesInformation: DEFAULT_EXPERIMENT_VARIABLE_VALUES(),

		// Initialization status of vue pages
		isInitialized: IS_FULLY_NOT_INITIALIZED_STATUS(),

		// Temporary space to store the flow, cursor and state of the real experiment while in prelude mode
		tempMemory: { /* flow, state, cursor */ }
	};
}

function DEFAULT_DESCRIPTION_SETTINGS_VALUES() {
	return {
		name: '', 																	// Name of the experiment
		folder: '', 																// Folder in which the resources for the experiment are located
		group: '', 																	// Group of the experiment
		version: 0, 																// Version of the experiment
	};
}

function DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES() {
	return {
		anyPianoKey: DEFAULT_ANY_PIANO_KEY, 												// Allowing any piano key press to advance to the next page
		enableSoundFlag: DEFAULT_ENABLE_SOUND_FLAG, 										// Whether or not the piano output is enabled by default in the session
		playingMode: DEFAULT_PLAYING_MODE, 													// Mode of the experiment ("rhythm" or "speed")
		instrument: DEFAULT_INSTRUMENT,														// Musical instrument to use for the production of sounds
		footnote: DEFAULT_FOOTNOTE, 														// Whether or not the experiment must display the inidcative foot note in each state
		footnoteType: DEFAULT_FOOTNOTE_TYPE, 												// Whether the footnote is made of simple text or buttons
		timeLimitInSeconds: DEFAULT_TIME_LIMIT, 											// Time limit of the experiment. If set to 0, ther is no limit and the timer will count up, otherwise the timer will count down
		logFlag: DEFAULT_LOG_FLAG, 															// Indicate wether or not the blocks must log it's data
		successesForSkip: DEFAULT_SUCCESSES_FOR_SKIP, 										// Indicate the number of successful 'Playing' states before being able to leave a group of blocks
		hideFeedbackSmiley: DEFAULT_HIDE_FEEDBACK_SMILEY, 									// Indicate whether the feedback state contains a smiley by default
		isSkipStepButtonInFootnote: DEFAULT_IS_SKIP_BUTTON_IN_FOOTNOTE, 					// Indicates wether the skip buttons are displayed by default in the footnote when there is a button footnote
		isSkipButtonInMainOptions: DEFAULT_IS_SKIP_BUTTON_IN_MAIN_OPTIONS,					// Indicates wether the skip button is displayed by default in the main options of the states with options when applicable.
		isGoBackButtonInFootnote: DEFAULT_IS_GO_BACK_BUTTON_IN_FOOTNOTE, 					// Indicates wether the go back button is displayed by default in the footnote when there is a button footnote
		programmedOctaveOffset: DEFAULT_PROGRAMMED_OCTAVE_OFFSET, 							// Indicates a preset octave shift for the midi piano (knowing that most midi piano are on octave 3 by default)
		interactivePianoFirstOctave: DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE,				// Indicate the first octave from which the notes must be displayed on the interactive piano (which has 2 octaves)
		controlType: DEFAULT_CONTROL_TYPE, 													// Indicate which type of controle is used by the application ('piano', 'keyboard' or 'none'). Will also affect the pre-session preparation of the user
		relativeRhythmImportance: DEFAULT_RELATIVE_RHYTHM_IMPORTANCE,						// Indicate wether the relative rhythm accuracy is computed with the IOI (false) or relative IOI (true)
		rhythmErrorMarginInMilliseconds: DEFAULT_RHYTHM_ERROR_MARGIN_IN_MILLISECONDS,		// Error margin allowed in the rhythm accuracy calculation
		rhythmRelativeErrorMarginInFloat: DEFAULT_RHYTHM_RELATIVE_ERROR_MARGIN_IN_FLOAT, 	// Relative error margin allowed in the rhythm accuracy calculation (overwrites the absolute value's error margin)
		withProgressionBar: DEFAULT_WITH_PROGRESSION_BAR,									// Indicate wether there must be a progrssion bar displayed in the experiment
		cueWaitForClick: DEFAULT_CUE_WAIT_FOR_CLICK,										// Indicate whether the cue must wait for a space bar click before playing
		withTimer: DEFAULT_HAS_TIMER,														// Indicate whether the timer must be displayed
		hasClearBackground: DEFAULT_HAS_CLEAR_BACKGROUND,									// Indicate whethe the experiment setting must be in white (true) or black (false)
		hasSound: DEFAULT_HAS_SOUND,														// Indicate whether the experiment has sound
		timeLeftMessages: DEFAULT_TIME_LEFT_MESSAGES,										// Object containning a message to display when certain time left thresholds (indicated in milliseconds) are reached
		hasNavigationBar: DEFAULT_HAS_NAVIGATION_BAR,										// Indicates if the session should have the upper navigation bar
		hasStatusBar: DEFAULT_STAUS_BAR,													// Indicates if the session should have the status bar
		isFullScreen: DEFAULT_IF_FULL_SCREEN,												// Indicates if the session should be in full screen
		reproductionSeed: DEFAULT_REPRODUCTION_SEED,										// Seed used in randomized components that can make the components reproductible.
		cuePresentationDelay: DEFAULT_CUE_PRESENTATION_DELAY,								// Delay that should be waited before presenting the cue in a cue state.
		mustKeepMarkerAfterEnd: DEFAULT_MUST_KEEP_MARKER_AFTFER_END,						// Indicates whether or not the task progression marker must be kept even after the end of a session
	};
}

function DEFAULT_EXPERIMENT_STATE_CURSOR_VALUES() {
	return {
		current: {
			index: 0, 																// Index of the current block of the flow
			innerStepIndex: 0, 														// Index of the current step of the block (browses the picture file names)
			numberRepetition: 1, 													// Number of repetitions left to do
			piledContentIndex: 0, 													// Index of the current step of the block (browses the midi and video file names)
		},
		navigation: {
			indexNext: 1, 															// Index of the next block of the flow
			indexGroupEnd: UNSET_INDEX, 											// Index of the end of a group of blocks (the last index with a followedBy or an individual block)
			indexLoopStart: UNSET_INDEX, 											// Index to which a loop start
			indexPileStart: UNSET_INDEX, 											// Index to which there remains content to depile
			lastInnerStepsIndex: 0, 												// Last index of inner steps in a given block
			totalNumberRepetitions: 1, 												// Number of repetitions in total
			lastPiledContentIndex: 0, 												// Last index of media content piled at the index pile start
		},
		flag: {
			isInPrelude: false,														// Indicator of whether or not the cursor is pointing at the prelude flow
			isInConclusion: false,													// Indicator of whether or not the cursor is pointing at the conclusion flow
			isBeyondEnd: false, 													// Indicator of whether the index as reached the end of the flow (is checked before moving the cursor forward)
			isInSkipableChain: false, 												// Indicator of whether the block must be skipped upon a skip request
			isInSkipIfNotMetSuccessGoalChain: false,								// Indicator of whether the bloc is in a chain of blocs to skip if a "skipIfNotMetSuccessGoal" situation is encountered
			isFirstIndexPassage: true,												// Indicator of whether it is the first time the index has reached a certain value (is false whenever the cursor loops back)
			needsResetLoopParameters: false,										// Indicator of whether he loop specific parameters need to be restarted (only when we enter a need block group)
			isNewBlock: true,														// Indicatio of wheter a new block was entered (Thus, we are not in just another inner step)
		},
	};
}

function DEFAULT_EXPERIMENT_STATE_STATE_VALUES() {
	return {
		type: '', 																	// Type of the current state
		// Displayable content elements
		content: {
			text: '',																// Text to display
			pictureName: '', 														// Name of the current picture to display
			helperImageName: '', 													// Name of the helper image to display
			textReminder: '',														// Helper ext to display
			interactivePiano: false, 												// <Boolean|String> Directive to display the interactive piano
			interactiveClicker: false,												// <Boolean|String> Directive to display the interactive clicker
			interactiveKeyboard: false, 											// <Boolean|String> Directive to display the interactive keyboard
			textAfterQuestionAsked: '',												// Text displayed after a question is asked in question states
			textBeforeMainContent: '',												// Text displayed before the main content of a state (used in grid location task)
			textAfterAnswerReceived: '',											// Text displayed after all the answers of the user are reveived (used in grid location task)
			textWaitBeforeNextStep: '',												// Text displayed before moving to the next state during the "wait before next step" time.
			textSpecification: '',													// Text to add a certain specification (used in question state)
		},

		optionsContent: {
			answerChoicesValue: [],													// Value stored for answer choice, it dictates how many choices are displayed in the question
			answerChoicesText: [],													// Text to display with answer choice
			answerChoicesColor: [],													// Color associated to a choice or all choices
			answerChoicesImage: [],													// Image to display with an answer choice (in image questions)

			surveyInputOptionsValues: [],											// List of the possible values that will be stored in memory for the input of the user in the survey (The number of options displayed is based on the length of this array)
			surveyInputOptionsText: [],												// List of the texts that will be displayed above each option of the survey
			surveyLeftSideText: [],													// Questions or texts to be written for the survey at the left, each value will be written in a row (the maximum length of surveyLeftSideText or surveyRightSideText will determine the number of row)
			surveyRightSideText: [],												// Questions or texts to be written for the survey at the right, each value will be written in a row (the maximum length of surveyLeftSideText or surveyRightSideText will determine the number of row)

			rightAnswers: null,														// Right answers in a question state
		},

		// Multimedia elements
		mediaFile: {
			midiName: '', 															// Name of the current midi file loaded in the player to play
			videoName: '', 															// Name of the current video file to playback
			referenceKeyboardKeys: [], 												// List of the reference keyboard keys meant to be pressed
			interactiveKeyboardTextMapping: null, 									// Mapping of the text to display on the keys of the keyboard according to the order in whcih the keys are pressed
			audioFirst: '',															// Audio file name
			audioSecond: '',														// Second audio file (for second part of sertain states)
		},
		// Block specific settings
		settings: {
			anyPianoKey: DEFAULT_ANY_PIANO_KEY,										// Block specific "anyPianoLKey" superseding the general setting
			enableSoundFlag: DEFAULT_ENABLE_SOUND_FLAG,								// Block specific "enableSoundFlag" superseding the general setting
			numberRepetition: 0,													// Number of repetitions of a block group
			timeoutInSeconds: 0,													// Time limit for a given block
			playingMode: DEFAULT_PLAYING_MODE,										// Playing mode ("rhythm" or "speed")
			footnote: DEFAULT_FOOTNOTE,												// Block specific "footnote" superseding the general setting
			footnoteType: DEFAULT_FOOTNOTE_TYPE,									// Block specific "footnoteType" superseding the general setting
			logFlag: DEFAULT_LOG_FLAG,												// Block specific "logFlag" superseding the general setting
			skipStepButton: '', 													// Button to press to skip the next block (is valid only if a button is specified)
			abortSessionButton: '',													// Button to press to abort the session (is valid only if a button is specified)
			isSkipStepButtonInFootnote: DEFAULT_IS_SKIP_BUTTON_IN_FOOTNOTE,			// Block specific isSkipStepButtonInFootnote superceeding the general parameter
			isSkipButtonInMainOptions: DEFAULT_IS_SKIP_BUTTON_IN_MAIN_OPTIONS,		// Block specific isSkipButtonInMainOptions superceeding the general parameter
			skipStepButtonMessage: '', 												// Message indicated on the skip button if there is a skip button
			abortSessionButtonMessage: '',											// Message indicated on the abort session button if there is an abort session button
			successFeedbackMessage: '', 											// Additional message displayed upon sucessfull feedback for all criteras
			failureFeedbackMessage: '', 											// Additional message displayed upon feedback with at least one failed critera
			melodyRepetition: 1,													// Number of times a melody is repeated in a block
			successesForSkip: DEFAULT_SUCCESSES_FOR_SKIP,							// Block specific "successesForSkip" superseding the general setting
			skipIfNotMetSuccessGoal: 0,												// Indicate the minimum number of successes required to avoid having to skip
			startSignal: 0,															// Signal countdown (if is 0, there is no signal countdown)
			feedbackNumerical: false,												// Indicator of whether the feedback must be given in its numerical form instead of with range bars
			interactivePianoFirstOctave: DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE,	// Block specific "interactivePianoFirstOctave" superseding the general setting
			skipLoopOnLastRepetition: false,										// Indicate whether a block must be skipped if it's on the last repetition
			canGoBack: false,														// Indicate that it is possible to go back one INNER STEP (we can not go back a block)
			goBackStepButton: '', 													// Button to press to go back to the previous inner step (is valid only if a button is specified)
			goBackButtonMessage: '', 												// Message indicated on the go back button if there is a go back button
			isGoBackButtonInFootnote: DEFAULT_IS_GO_BACK_BUTTON_IN_FOOTNOTE,		// Block specific isGoBackButtonInFootnote superceeding the general parameter
			checkpoint: true,														// Indicate whether the state should be saved at the current block
			strictPlay: false,														// Indicate whether the playing state must be stopped upon a mistake
			mainOptionText: '',														// Indicate the text to include when there is a state with a main option/button

			surveyType: '',															// Indicate the survey type for the 'survey' type
			surveyOptionsAreRadio: true,											// Indicate if the survey questions are radio (one choice is allowed per question) or if multiple choices per questions are allowed
			surveyAreAnswersMandatory: false,										// Indicate whether all answers are mandatory in order to be able to go to the next step when in a survey or if some questions can be left unanswered

			writtingMaxCharacters: 100,												// Indicate the maximum amount of caracters allowed to be written in a "writting" state
			writtingMinCharacters: 0,												// Indicate the minimum amount of characters needed in a "writting" state to be able to move to the next state
			writtingIsNumber: false,												// Indicate whether the input writting expected should only be a numerical input
			writtingIsMultiline: true,												// Indicate whether the input writting area should be displayed with multiple lines
			writtingTextPlaceHolder: '',											// Indicate the text that will be written in the text input area when there is nothing written 

			questionType: DEFAULT_QUESTION_TYPE,									// Indicate the question type for the 'question' states
			areAnswerOptionsVertical: false,										// Disposition of the anserChoices (vertical if true, horizontal if false)
			areInactiveAnswersDisplayed: false,										// Indicate if answers with a text but no value must be displayed (as incactive choices)
			questionMustConfirmAnswer: false,										// Indicates whether or not the question must have a 'submit/confirm' button. If set to false, a click on an option will automatically submit the clicked option as the answer. 
			questionCanSubmitBlankAnswer: false,									// Indicate whether or not a blank answer is accepted for the question in questions. A 'submit no answer' button will be displayed in the options if this parameter is set to true.
			questionSubmitAnswerButtonText: '',										// Text to display in the submit answer button of a question state that needs a confirmation before submitting answers
			questionBlankAnswerButtonText: '',										// Text to display in the 'submit blank answer' button of a question state and accepts blank answers

			hasNavigationBar: DEFAULT_HAS_NAVIGATION_BAR,							// Block specific indicator of whether the step should have the upper navigation bar
			hasStatusBar: DEFAULT_STAUS_BAR,										// Block specific indicator of whether the step should have the status bar
			isFullScreen: DEFAULT_IF_FULL_SCREEN,									// Block specific indicator of whether the step should be in full screen

			pvtMinTime: 1000,														// Minimum time for a pvt stimulus in milliseconds
			pvtMaxTime: 10000,														// Maximum time for a pvt stimulus in milliseconds
			pvtCount: 1,															// Number of pvt stimuli to submit
			maxResponseTime: 5000,													// Maximum time to react to the stimulus
			pvtTooEarlyMessage: '',													// Message to display if the user reacts before the stimulus in a pvt state
			pvtHasCentralElement: true,												// Indicates if the pvt test must have a centre visual element

			matrixSizeX: 2,															// X dimension of the matrix in states where a matix is involved (used in glt)
			matrixSizeY: 2,															// Y dimension of the matrix in states where a matix is involved (used in glt)
			presentationTime: 1000,													// Time during which a content is presentation before the main elements of a state (used in glt)
			stimuliTime: 1000,														// Time during which a stimuli is presented (used in glt)
			matrixUsedCellsCount: -1,												// Indicate the number of cells of the matrix should be used. A negative number indicates the numebr of cells that should not be used.
			includesPresentation: true,												// Indicate if the state includes a presentation phase (used in glt)
			includesTest: true,														// Indicate if the state includes a test phase (used in glt)

			gltScoreForSuccess: 0,													// Number of correct answers required in a glt state for the state to be considered a success.
			gltMustHideBeforeClick: true, 											// Indicates whether the user should be able to click a cell in the glt matrix when the stimulus is still visible. 
			gltPauseBetweenPresentations: 1000, 									// Time to wait after having presented a cell and before presenting the next cell in the glt.
			gltPauseBetweenStimuli: 1000,											// Time to wait after having cued a stimulus and before cuing the next cell in the glt.
			gltCellSize: 100,														// Size of the size of the square cells in the glt grid.
			matrixUnusedCells: null,												// Indicates the cells that should not be used in a matrix (used in glt).

			cuePresentationDelay: DEFAULT_CUE_PRESENTATION_DELAY,					// Block specific delay that should be waited before presenting the cue in a cue state.

			reproductionSeed: DEFAULT_REPRODUCTION_SEED,							// Block specific Seed used in randomized components that can make the components reproductible.
			waitBeforeNextStep: 0,													// Delay before the transition to the next state used in certain states (glt).
		},
		// Session specific informations
		record: {
			logLabel: DEFAULT_LOG_LABEL,											// Active label that will be associated to the logs
			isInTimeUp: false, 														// Indicator of whether or not the time limit is reached
			sucesses: 0, 															// Number of successes recorded
			successesInLoop: 0, 													// Number of successes recorded in the loop
			previousSucessesInLoop: 0,												// Number of sucesses in loop from the previous group of states
			isSuccess: false, 														// Indicate whether the current step was a success
			isWaitingReadyStartSignal: false, 										// Indicate whether a 'Ready Start' signal is being awaited
			considerExperimentFinished: false,										// Signal that indicates whether at the current position in experiment, the sesion can be considered completed (it is set as a record since it must be considered even when skipping steps)
			timeIndicatedInMilliseconds: 0											// Value in indicating the time indicated in the experiment (is used when the experiment has a time limit, this allows the app to make the user restart with the time he had left if he leaves the experiment early)
		},
	};
}

function DEFAULT_KEYBOARD_TO_MIDI_INPUT_MAPPING() {
	return {};
}


/**
 * Return a Experiment_Variable_Values object with all attributes reset to their default values.
 * @returns {Experiment_Variable_Values} Experiment_Variable_Values object of with all attributes reinitialized to their default values
*/
function DEFAULT_EXPERIMENT_VARIABLE_VALUES() {
	return {
		// Attributes of the "variables" object have the following structure :
		//
		// VARIABLE_NAME: {
		// 	initialValue: null,
		// 	currentValue: null,
		// 	imposedValue: null,
		// 	isConstant: true,
		//  isStateVariable: false,
		// 	optionValues: [],
		// 	valueSelectionType: 'fixed',
		// 	scheduleName: null
		// },
		variables: {},

		// Attributes of the "schedules" object have the following structure :
		//
		// SCHEDULE_NAME: [],
		schedules: {},
	};
}

function IS_FULLY_NOT_INITIALIZED_STATUS() {
	return {
		route: false,																// Flag indicating whether the route needs to be updated
		record: false,																// Flag indicating whether the session specific information needs to be updated
		state: false,																// Flag indicating whether the state's settings need to be opdated
		media: false,																// Flag indicating whether the state's media files need to be updated
		content: false,																// Flag indicating whether the state's content need to be updated
		options: false,																// Flag indicating whether the state's option content need to be updated
	};
}
