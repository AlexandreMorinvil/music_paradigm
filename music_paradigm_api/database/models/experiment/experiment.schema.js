const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: [
            "cue", 
            "end", 
            "feedback",
            "glt", 
            "instruction", 
            "playing", 
            "pvt", 
            "question", 
            "rest", 
            "survey", 
            "video", 
            "writting",
        ]
    },
    textContent: { type: Schema.Types.Mixed, default: undefined },
    pictureFileName: { type: Schema.Types.Mixed, default: undefined },

    interactivePiano: { type: Schema.Types.Mixed, default: undefined },
    interactiveClicker: { type: Schema.Types.Mixed, default: undefined },
    interactiveKeyboard: { type: Schema.Types.Mixed, default: undefined },
    interactiveKeyboardTextMapping: { type: Schema.Types.Mixed, default: undefined },

    midiFileName: { type: Schema.Types.Mixed, default: undefined },
    videoFileName: { type: Schema.Types.Mixed, default: undefined },
    helperImageFileName: { type: Schema.Types.Mixed, default: undefined },
    referenceKeyboardKeys: { type: [], default: undefined },

    numberRepetition: { type: Schema.Types.Mixed, default: undefined },
    followedBy: { type: Schema.Types.Mixed, default: undefined },
    anyPianoKey: { type: Schema.Types.Mixed, default: undefined },
    enableSoundFlag: { type: Schema.Types.Mixed, default: undefined },
    timeoutInSeconds: { type: Schema.Types.Mixed, default: undefined },
    playingMode: { type: String, default: undefined },
    footnote: { type: Schema.Types.Mixed, default: undefined },
    footnoteType: { type: String, default: undefined },
    logFlag: { type: Schema.Types.Mixed, default: undefined },
    loopEnd: { type: Schema.Types.Mixed, default: undefined },
    hideFeedbackSmiley: { type: Schema.Types.Mixed, default: undefined },
    abortSessionButton: { type: String, default: undefined },
    abortSessionButtonMessage: { type: String, default: undefined },
    skipStepButton: { type: String, default: undefined },
    isSkipStepButtonInFootnote: { type: Schema.Types.Mixed, default: undefined },
    skipStepButtonMessage: { type: String, default: undefined },
    isSkipButtonInMainOptions: { type: Schema.Types.Mixed, default: undefined },
    isInSkipableChain: { type: Schema.Types.Mixed, default: undefined },
    successFeedbackMessage: { type: String, default: undefined },
    failureFeedbackMessage: { type: String, default: undefined },
    footnoteMessage: { type: String, default: undefined },
    melodyRepetition: { type: Schema.Types.Mixed, default: undefined },
    successesForSkipLoop: { type: Schema.Types.Mixed, default: undefined },
    startSignal: { type: Schema.Types.Mixed, default: undefined },
    feedbackNumerical: { type: Schema.Types.Mixed, default: undefined },
    skipLoopOnLastRepetition: { type: Schema.Types.Mixed, default: undefined },
    skipIfNotMetSuccessGoal: { type: Schema.Types.Mixed, default: undefined },
    isInSkipIfNotMetSuccessGoalChain: { type: Schema.Types.Mixed, default: undefined },
    maxStackedContent: { type: Schema.Types.Mixed, default: undefined },

    mainOptionText: { type: String, default: undefined },

    canGoBack: { type: Schema.Types.Mixed, default: undefined },
    isGoBackButtonInFootnote: { type: Schema.Types.Mixed, default: undefined },
    goBackStepButton: { type: String, default: undefined },
    goBackButtonMessage: { type: String, default: undefined },

    lastRepetitionVersion: { type: Object, default: undefined },
    succeeededForSkipLoopVersion: { type: Object, default: undefined },

    resetVariable: { type: String, default: undefined },
    incrementVariable: { type: String, default: undefined },
    decrementVariable: { type: String, default: undefined },
    incrementVariableOnSucess: { type: String, default: undefined },
    decrementVariableOnSucces: { type: String, default: undefined },

    controlType: { type: String, default: undefined },
    checkpoint: { type: String, default: undefined, enum: ['once', 'first', 'all'] },
    strictPlay: { type: Schema.Types.Mixed, default: undefined },
    considerExperimentFinished: { type: Schema.Types.Mixed, default: undefined },

    logLabel: {type: String, default: undefined },

    surveyType: { type: String, default: undefined, enum: ['checkbox', 'dropdown'] },
    surveyOptionsAreRadio: { type: Schema.Types.Mixed, default: undefined },
    surveyAreAnswersMandatory: { type: Schema.Types.Mixed, default: undefined },
    surveyInputOptionsValues: { type: [], default: undefined },
    surveyInputOptionsText: { type: [], default: undefined },
    surveyLeftSideText: { type: [], default: undefined },
    surveyRightSideText: { type: [], default: undefined },

    writtingTextAreasNumber: { type: Schema.Types.Mixed, default: undefined },
    writtingTextAreasMax: { type: Schema.Types.Mixed, default: undefined },
    writtingTextAreasMin: { type: Schema.Types.Mixed, default: undefined },
    writtingMaxCharacters: { type: Schema.Types.Mixed, default: undefined },
    writtingMinCharacters: { type: Schema.Types.Mixed, default: undefined },
    writtingIsNumber: { type: Schema.Types.Mixed, default: undefined },
    writtingIsMultiline: { type: Schema.Types.Mixed, default: undefined },
    writtingTextPlaceHolder: { type: String, default: undefined },

    questionType: { type: String, default: undefined, enum: ['simple', 'image-choices', 'audio-start', 'midi-note'] },
    audioFirst: { type: Schema.Types.Mixed, default: undefined },
    audioSecond: { type: Schema.Types.Mixed, default: undefined },
    textAfterQuestionAsked: { type: Schema.Types.Mixed, default: undefined },
    textSpecification: { type: Schema.Types.Mixed, default: undefined },
    textReminder: { type: Schema.Types.Mixed, default: undefined },
    questionMustConfirmAnswer: { type: Schema.Types.Mixed, default: undefined },
    questionCanSubmitBlankAnswer: { type: Schema.Types.Mixed, default: undefined },
    questionSubmitAnswerButtonText: { type: String, default: undefined },
    questionBlankAnswerButtonText: { type: String, default: undefined },
    
    areAnswerOptionsVertical: { type: Schema.Types.Mixed, default: undefined },
    areInactiveAnswersDisplayed: { type: Schema.Types.Mixed, default: undefined },
    answerChoicesValue: { type: [], default: undefined },
    answerChoicesText: { type: [], default: undefined },
    answerChoicesColor: { type: [], default: undefined },
    answerChoicesImage: { type: [], default: undefined },

    rightAnswers: { type: Schema.Types.Mixed, default: undefined },

    hasNavigationBar: { type: Schema.Types.Mixed, default: undefined },
    hasStatusBar: { type: Schema.Types.Mixed, default: undefined },
    isFullScreen: { type: Schema.Types.Mixed, default: undefined },

    pvtMinTime: { type: Schema.Types.Mixed, default: undefined },
    pvtMaxTime: { type: Schema.Types.Mixed, default: undefined },
    pvtCount: { type: Schema.Types.Mixed, default: undefined },
    pvtTooEarlyMessage: { type: String, default: undefined },
    pvtHasCentralElement: { type: Schema.Types.Mixed, default: undefined },

    matrixSizeX: { type: Schema.Types.Mixed, default: undefined },
    matrixSizeY: { type: Schema.Types.Mixed, default: undefined },
    matrixUsedCellsCount: { type: Schema.Types.Mixed, default: undefined },
    presentationTime: { type: Schema.Types.Mixed, default: undefined },
    stimuliTime: { type: Schema.Types.Mixed, default: undefined },
    maxResponseTime: { type: Schema.Types.Mixed, default: undefined },
    includesPresentation: { type: Schema.Types.Mixed, default: undefined },
    includesTest: { type: Schema.Types.Mixed, default: undefined },
    gltScoreForSuccess: { type: Schema.Types.Mixed, default: undefined },
    gltMustHideBeforeClick: { type: Schema.Types.Mixed, default: undefined },
    gltPauseBetweenPresentations: { type: Schema.Types.Mixed, default: undefined },
    gltPauseBetweenStimuli: { type: Schema.Types.Mixed, default: undefined },
    gltCellSize: { type: Schema.Types.Mixed, default: undefined },

    matrixUnusedCells: { type: Schema.Types.Mixed, default: undefined },
    cuePresentationDelay: { type: Schema.Types.Mixed, default: undefined },
    
    textBeforeMainContent: { type: Schema.Types.Mixed, default: undefined },
    textAfterAnswerReceived: { type: Schema.Types.Mixed, default: undefined },
    textWaitBeforeNextStep: { type: String, default: undefined },
    waitBeforeNextStep: { type: Schema.Types.Mixed, default: undefined },
    reproductionSeed: { type: String, default: undefined },

    cueMelodyProportionalDelayAfter: { type: Schema.Types.Mixed, default: undefined },
    cueAdditionalDelayAfter: { type: Schema.Types.Mixed, default: undefined },
    cueEnablePianoAfterCue: { type: Schema.Types.Mixed, default: undefined },
},
    {
        strict: true
    }
);

const schema = new Schema({
    group: { type: String, default: "default", lowercase: true, trim: true },
    name: { type: String, required: true, lowercase: true, trim: true },
    version: { type: String, default: "1" },
    folder: { type: String, default: "", reqired: true },
    mode: { type: String, default: "rhythm" },
    anyPianoKey: { type: Schema.Types.Mixed, default: false },
    enableSoundFlag: { type: Schema.Types.Mixed, default: false },
    footnote: { type: Schema.Types.Mixed, default: false },
    footnoteType: { type: String, default: 'simple' },
    timeLimitInSeconds: { type: Schema.Types.Mixed, default: 0 },
    logFlag: { type: Schema.Types.Mixed, default: true },
    successesForSkip: { type: Schema.Types.Mixed, default: 0 },
    hideFeedbackSmiley: { type: Schema.Types.Mixed, default: false },
    isSkipStepButtonInFootnote: { type: Schema.Types.Mixed, default: undefined },
    isSkipButtonInMainOptions: { type: Schema.Types.Mixed, default: undefined },
    isGoBackButtonInFootnote: { type: Schema.Types.Mixed, default: undefined },
    programmedOctaveOffset: { type: Schema.Types.Mixed, default: 0 },
    interactivePianoFirstOctave: { type: Schema.Types.Mixed, default: 4 },
    controlType: { type: String, default: 'piano', enum: ['piano', 'keyboard', 'clicker', 'none'] },
    
    relativeRhythmImportance: { type: Schema.Types.Mixed, default: undefined },
    rhythmErrorMarginInMilliseconds: { type: Schema.Types.Mixed, default: undefined },
    rhythmRelativeErrorMarginInFloat: { type: Schema.Types.Mixed, default: undefined },

    withProgressionBar: { type: Schema.Types.Mixed, default: true },
    logLabel: {type: String, default: 'default' },

    cueWaitForClick: { type: Schema.Types.Mixed, default: false },
    instrument: {type: String, default: undefined },
    withTimer: { type: Schema.Types.Mixed, default: true },
    hasClearBackground: { type: Schema.Types.Mixed, default: undefined },
    hasSound: { type: Schema.Types.Mixed, default: true },
    timeLeftMessages: { type: Object, default: undefined },

    hasNavigationBar: { type: Schema.Types.Mixed, default: true },
    hasStatusBar: { type: Schema.Types.Mixed, default: true },
    isFullScreen: { type: Schema.Types.Mixed, default: true },

    cuePresentationDelay: { type: Schema.Types.Mixed, default: undefined },

    reproductionSeed: { type: String, default: undefined },

    mustKeepMarkerAfterEnd: { type: Schema.Types.Mixed, default: undefined },

    keyboardToMidiInputMapping:{
        default: undefined,
        type: Object,
        required: false
    },

    flow: {
        default: [],
        type: [stateSchema],
        required: true
    },
    flowPrelude: {
        default: [],
        type: [stateSchema],
        required: false,
    },
    flowConclusion: {
        default: [],
        type: [stateSchema],
        required: false
    },
    timeUpState: {
        default: undefined,
        type: stateSchema,
        required: false
    },
    variables: [
        {
            name: { type: String, required: true },
            type: {
                type: String,
                enum: ['variable', 'parameter'],
                default: "variable",
            },
            assignation: {
                type: String,
                enum: ['constant', 'dynamic'],
                default: "constant",
            },
            assignedValue: {
                type: Schema.Types.Mixed,
                default: undefined,
                required: true
            },
            acceptsFreeTextValue: {
                type: Boolean,
                default: undefined,
                required: false
            },
            valueSelectionType: {
                type: String,
                enum: ['assigned', 'random', 'scheduled'],
                default: "assigned"
            },
            scheduleName: {
                type: String,
                default: undefined,
                required: false
            },
            optionValues: { 
                type: [],
                default: [] 
            },
        }
    ],
    variablesSchedules: 
    [
        {
            name: {
                type: String,
                default: "schedule",
                required: true
            },
            numberElements: {
                type: Number,
                min: 1,
                default: undefined,
                required: false
            },
            numberVariantsBalancedInCurriculum: {
                type: Number,
                min: 0,
                default: 0,
                required: true,
            },
            scheduleType: {
                type: String,
                enum: ['fixed', 'random', 'permutated'],
                required: 'fixed'
            },
            schedule: {
                type: [Number],
                default: [],
                required: false
            },
        }
    ]
},
    {
        strict: true,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

// Indexes cration
schema.index({ "group": 1, "name": 1, "version": 1 }, { unique: true });

module.exports = schema;