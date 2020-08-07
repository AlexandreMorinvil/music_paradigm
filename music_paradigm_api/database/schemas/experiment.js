const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    group: {
        type: String,
        default: "Default-1",
        set: (vavlue) => {
            return "1234";
        },
    },
    name: { type: String, required: true },
    folder: { type: String, reqired: true },
    mode: { type: String, default: Date.now },
    anyPianoKey: { type: Boolean, default: false },
    enableSoundFlag: { type: Boolean, default: false },
    footnote: { type: Boolean, default: false },
    timeLimitInSeconds: { type: Number, default: 0 },
    logFlag: { type: Boolean, default: true },
    successesForSkip: { type: Number, default: 0 },
    flow: {
        required: true,
        default: {},
        type: [
            {
                type: {
                    type: String,
                    required: true,
                    enum: ["cue", "end", "feedback", "instruction", "playing", "rest", "video"]
                },
                textContent: { type: [String], default: undefined },
                interactivePiano: { type: [], default: undefined },
                pictureFileName: { type: [String], default: undefined },
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
                successesForSkip: { type: Number, default: undefined }
            }
        ]
    }
});

schema.set('toJSON', { virtuals: true });
const model = mongoose.model('Experiment', schema, 'experiments');

module.exports = {
    schema: schema,
    model: model
}