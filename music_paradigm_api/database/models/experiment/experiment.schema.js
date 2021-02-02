const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
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
                optionValues: { type: [], default: [] },
            }
        ],
        flow: {
            required: true,
            default: [],
            type: [
                {
                    type: {
                        type: String,
                        required: true,
                        //enum: ["cue", "end", "feedback", "instruction", "playing", "rest", "video"]
                    },
                    textContent: { type: [], default: undefined },
                    pictureFileName: { type: [], default: undefined },
                    interactivePiano: { type: [], default: undefined },
                    interactiveKeyboard: { type: [], default: undefined },
                    midiFileName: { type: [String], default: undefined },
                    videoFileName: { type: [String], default: undefined },
                    referenceKeyboardKeys: { type: [[String]], default: undefined },
                    numberRepetition: { type: Number, default: undefined },
                    followedBy: { type: Boolean, default: undefined },
                    anyPianoKey: { type: Boolean, default: undefined },
                    enableSoundFlag: { type: Boolean, default: undefined },
                    timeoutInSeconds: { type: Number, default: undefined },
                    playingMode: { type: String, default: undefined },
                    footnote: { type: Boolean, default: undefined },
                    footnoteType: { type: String, default: undefined },
                    logFlag: { type: Boolean, default: undefined },
                    helperImageFileName: { type: [String], default: undefined },
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
                }
            ]
        }
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