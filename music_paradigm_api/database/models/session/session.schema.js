const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        userId: { type: String, required: true },
        username: { type: String, required: true },

        experimentName: { type: String, required: true },
        // List of the experiments composing the curriculum
        state: {
            type: [
                {
                    type: { type: String },
                    header: {
                        timestamp: { type: Date }
                    },
                    notes: {
                        type: {
                            reference: {
                                name: { type: String, default: "" },    // Name of the midi file
                                midi: { type: [], default: null },      // Midi number, e.g. 60 
                                time: { type: [], default: null },      // Time in seconds
                                duration: { type: [], default: null },  // Duration in seconds between noteOn and noteOff
                                velocity: { type: [], default: null },  // Normalized 0-1 velocity
                            },
                            played: {
                                startTime: 0,                           // Time in milliseconds of the first note
                                volume: { type: [], default: null },    // Indicator of if the pressed note generated an output
                                midi: { type: [], default: null },      // Midi number, e.g. 60 
                                time: { type: [], default: null },      // Time in milliseconds (previously called Offset)
                                duration: { type: [], default: null },  // Duration in seconds between noteOn and noteOff
                                velocity: { type: [], default: null },  // Normalized 0-1 velocity
                            },
                            evaluation: { type: Object, default: undefined },
                            preprocessedMetrics: { type: Object, default: undefined }
                        },
                    },
                    state: { type: Object, default: undefined },
                    cursor: { type: Object, default: undefined }
                }
            ],
            default: []
        }
    },
    {
        strict: false,
        runValidators: true,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = schema;