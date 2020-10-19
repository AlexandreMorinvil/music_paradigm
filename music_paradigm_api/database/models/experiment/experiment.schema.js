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
        timeLimitInSeconds: { type: Number, default: 0 },
        logFlag: { type: Boolean, default: true },
        successesForSkip: { type: Number, default: 0 },
        hideFeedbackSmiley: { type: Boolean, default: false },
        variable: [
            {
                name: String,
                values: []
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
                    midiFileName: { type: [String], default: undefined },
                    videoFileName: { type: [String], default: undefined },
                    numberRepetition: { type: Number, default: undefined },
                    followedBy: { type: Boolean, default: undefined },
                    anyPianoKey: { type: Boolean, default: undefined },
                    enableSoundFlag: { type: Boolean, default: undefined },
                    timeoutInSeconds: { type: Number, default: undefined },
                    playingMode: { type: String, default: undefined },
                    footnote: { type: Boolean, default: undefined },
                    logFlag: { type: Boolean, default: undefined },
                    helperImageFileName: { type: [String], default: undefined },
                    hideFeedbackSmiley: { type: Boolean, default: undefined },
                    skipStepButton: { type: String, default: undefined },
                    skipStepButtonMessage: { type: String, default: undefined },
                    isInSkipableChain: { type: Boolean, default: undefined },
                    successFeedbackMessage: { type: String, default: undefined },
                    failureFeedbackMessage: { type: String, default: undefined },
                    footnoteMessage: { type: String, default: undefined },
                    melodyRepetition: { type: Number, default: undefined },
                    successesForSkipLoop: { type: Number, default: undefined },
                }
            ]
        }
    },
    {
        strict: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

// Indexes cration
schema.index({ "group": 1, "name": 1, "version": 1 }, { unique: true });

module.exports = schema;