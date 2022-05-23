const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["cue", "end", "feedback", "instruction", "playing", 'pvt', 'question', "rest", "survey", "video", "writting"]
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

    numberRepetition: { type: Number, default: undefined },
    followedBy: { type: Boolean, default: undefined },
    anyPianoKey: { type: Boolean, default: undefined },
    enableSoundFlag: { type: Boolean, default: undefined },
    timeoutInSeconds: { type: Number, default: undefined },
    playingMode: { type: String, default: undefined },
    footnote: { type: Boolean, default: undefined },
    footnoteType: { type: String, default: undefined },
    logFlag: { type: Boolean, default: undefined },
    hideFeedbackSmiley: { type: Boolean, default: undefined },
    skipStepButton: { type: String, default: undefined },
    isSkipStepButtonInFootnote: { type: Boolean, default: undefined },
    skipStepButtonMessage: { type: String, default: undefined },
    isSkipButtonInMainOptions: { type: Boolean, default: undefined },
    isInSkipableChain: { type: Boolean, default: undefined },
    successFeedbackMessage: { type: String, default: undefined },
    failureFeedbackMessage: { type: String, default: undefined },
    footnoteMessage: { type: String, default: undefined },
    melodyRepetition: { type: Number, default: undefined },
    successesForSkipLoop: { type: Number, default: undefined },
    startSignal: { type: Number, default: undefined },
    feedbackNumerical: { type: Boolean, default: undefined },
    skipLoopOnLastRepetition: { type: Boolean, default: undefined },
    skipIfNotMetSuccessGoal: { type: Number, default: undefined },
    isInSkipIfNotMetSuccessGoalChain: { type: Boolean, default: undefined },

    canGoBack: { type: Boolean, default: undefined },
    isGoBackButtonInFootnote: { type: Boolean, default: undefined },
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
    strictPlay: { type: Boolean, default: undefined },
    considerExperimentFinished: { type: Boolean, default: undefined },

    logLabel: {type: String, default: undefined },

    surveyType: { type: String, default: undefined, enum: ['checkbox', 'dropdown'] },
    surveyOptionsAreRadio: { type: Boolean, default: undefined },
    surveyAreAnswersMandatory: { type: Boolean, default: undefined },
    surveyInputOptionsValues: { type: [], default: undefined },
    surveyInputOptionsText: { type: [], default: undefined },
    surveyLeftSideText: { type: [], default: undefined },
    surveyRightSideText: { type: [], default: undefined },

    writtingMaxCharacters: { type: Number, default: undefined },
    writtingMinCharacters: { type: Number, default: undefined },
    writtingIsNumber: { type: Boolean, default: undefined },
    writtingIsMultiline: { type: Boolean, default: undefined },
    writtingTextPlaceHolder: { type: String, default: undefined },

    questionType: { type: String, default: undefined, enum: ['simple', 'image-choices', 'audio-start', 'midi-note'] },
    audioFirst: { type: Schema.Types.Mixed, default: undefined },
    audioSecond: { type: Schema.Types.Mixed, default: undefined },
    textAfterQuestionAsked: { type: Schema.Types.Mixed, default: undefined },
    textSpecification: { type: Schema.Types.Mixed, default: undefined },
    textReminder: { type: Schema.Types.Mixed, default: undefined },
    
    areAnswerOptionsVertical: { type: Boolean, default: undefined },
    areInactiveAnswersDisplayed: { type: Boolean, default: undefined },
    answerChoicesValue: { type: [], default: undefined },
    answerChoicesText: { type: [], default: undefined },
    answerChoicesColor: { type: [], default: undefined },
    answerChoicesImage: { type: [], default: undefined },

    rightAnswers: { type: Schema.Types.Mixed, default: undefined },

    hasNavigationBar: { type: Boolean, default: undefined },
    hasStatusBar: { type: Boolean, default: undefined },
    isFullScreen: { type: Boolean, default: undefined },

    pvtMinTime: { type: Number, default: undefined },
    pvtMaxTime: { type: Number, default: undefined },
    pvtCount: { type: Number, default: undefined },
    pvtMaxResponseTime: { type: Number, default: undefined },
    pvtTooEarlyMessage: { type: String, default: undefined },
    pvtHasCentralElement: { type: Boolean, default: undefined },
},
    {
        strict: true
    }
);

const schema = new Schema({
    group: { type: String, default: "default", lowercase: true, trim: true },
    name: { type: String, required: true, lowercase: true, trim: true },
    version: { type: String, default: "1" },
    folder: { type: String, reqired: true },
    mode: { type: String, default: "rhythm" },
    anyPianoKey: { type: Boolean, default: false },
    enableSoundFlag: { type: Boolean, default: false },
    footnote: { type: Boolean, default: false },
    footnoteType: { type: String, default: 'simple' },
    timeLimitInSeconds: { type: Number, default: 0 },
    logFlag: { type: Boolean, default: true },
    successesForSkip: { type: Number, default: 0 },
    hideFeedbackSmiley: { type: Boolean, default: false },
    isSkipStepButtonInFootnote: { type: Boolean, default: undefined },
    isSkipButtonInMainOptions: { type: Boolean, default: undefined },
    isGoBackButtonInFootnote: { type: Boolean, default: undefined },
    programmedOctaveOffset: { type: Number, default: 0 },
    interactivePianoFirstOctave: { type: Number, default: 4 },
    controlType: { type: String, default: 'piano', enum: ['piano', 'keyboard', 'clicker', 'none'] },
    
    relativeRhythmImportance: { type: Number, default: undefined },
    rhythmErrorMarginInMilliseconds: { type: Number, default: undefined },
    rhythmRelativeErrorMarginInFloat: { type: Number, default: undefined },

    withProgressionBar: { type: Boolean, default: true },
    logLabel: {type: String, default: 'default' },

    cueWaitForClick: { type: Boolean, default: false },
    instrument: {type: String, default: undefined },
    withTimer: { type: Boolean, default: true },
    hasClearBackground: { type: Boolean, default: undefined },
    hasSound: { type: Boolean, default: true },
    timeLeftMessages: { type: Object, default: undefined },

    hasNavigationBar: { type: Boolean, default: true },
    hasStatusBar: { type: Boolean, default: true },
    isFullScreen: { type: Boolean, default: true },

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