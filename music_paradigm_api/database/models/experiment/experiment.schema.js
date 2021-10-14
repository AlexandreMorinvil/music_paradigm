const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["cue", "end", "feedback", "instruction", "playing", "rest", "video", "survey", "writting"]
    },
    textContent: { type: Schema.Types.Mixed, default: undefined },
    pictureFileName: { type: Schema.Types.Mixed, default: undefined },
    interactivePiano: { type: Schema.Types.Mixed, default: undefined },
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

    surveyOptionsAreRadio: { type: Boolean, default: undefined },
    surveyAreAnswersMandatory: { type: Boolean, default: undefined },
    surveyInputOptionsValues: { type: [], default: undefined },
    surveyInputOptionsText: { type: [], default: undefined },
    surveyLeftSideText: { type: [], default: undefined },
    surveyRightSideText: { type: [], default: undefined },
},
    {
        strict: true
    }
);

const schema = new Schema({
    group: { type: String, default: "default", lowercase: true, trim: true },
    name: { type: String, required: true, lowercase: true, trim: true },
    version: { type: Number, default: 1, min: 1 },
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
    isGoBackButtonInFootnote: { type: Boolean, default: undefined },
    programmedOctaveOffset: { type: Number, default: 0 },
    interactivePianoFirstOctave: { type: Number, default: 4 },
    controlType: { type: String, default: 'piano', enum: ['piano', 'keyboard', 'none'] },
    
    relativeRhythmImportance: { type: Number, default: undefined },
    rhythmErrorMarginInMilliseconds: { type: Number, default: undefined },
    rhythmRelativeErrorMarginInFloat: { type: Number, default: undefined },

    withProgressionBar: { type: Boolean, default: true },
    logLabel: {type: String, default: 'default' },

    cueWaitForClick: { type: Boolean, default: false },

    prelude: {
        default: [],
        type: [stateSchema],
        required: false,
    },
    timeUpState: {
        default: undefined,
        type: stateSchema,
        required: false
    },
    flow: {
        default: [],
        type: [stateSchema],
        required: true
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
            optionValues: { 
                type: [],
                 default: [] 
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