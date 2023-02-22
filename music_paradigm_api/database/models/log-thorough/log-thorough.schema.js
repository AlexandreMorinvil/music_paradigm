const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogConclusion = new Schema({
    time: { type: Date, default: Date.now },
    isInTimeUp: { type: Boolean, default: false },
    nextLogLabel: { type: String, default: undefined },
})

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, default: null },
        experimentId: { type: Schema.Types.ObjectId, default: null },
        progressionId: { type: Schema.Types.ObjectId, default: null },
        curriculumId: { type: Schema.Types.ObjectId, default: null },
        associativeId: { type: String, default: undefined },
        associativeIdOrdinalNumber: { type: Number, default: undefined },
        logLabel: { type: String, default: 'default' },
        logTags: { type: [String], default: null },

        completionCount: { type: Number, default: 0 },

        username: { type: String, default: undefined },
        curriculumTitle: { type: String, default: null },
        experimentGroup: { type: String, default: undefined },
        experimentName: { type: String, default: undefined },
        experimentVersion: { type: String, default: undefined },

        startTimestamp: { type: [Date], default: Date.now },
        endTimestamp: { type: [LogConclusion], default: null },

        // List of blocks encountered in the session
        blocks: {
            type: [
                {
                    timestamp: { type: Date },

                    startCount: { type: Number, default: 1 },

                    blockType: { type: String },
                    blockSubType: { type: String },
                    index: { type: Number },
                    innerIndex: { type: Number },
                    repetition: { type: Number },
                    isInPrelude: { type: Boolean },
                    timestamp: { type: Date },

                    reference: { type: Object },

                    // Block context
                    text: { type: String, default: undefined },
                    pictureName: { type: String, default: undefined },
                    helperImageName: { type: String, default: undefined },

                    // Performance logs (piano)
                    pressedStartTime: { type: Date, default: undefined },
                    pressedKeys: { type: [], default: undefined },
                    pressedTime: { type: [Number], default: undefined },
                    pressedDuration: { type: [Number], default: undefined },
                    pressedVelocity: { type: [Number], default: undefined },

                    // Performance logs (computer keyboard)
                    pressedKeyboardStartTime: { type: Date, default: undefined },
                    pressedKeyboardKeys: { type: [], default: undefined },
                    pressedKeyboardTime: { type: [Number], default: undefined },
                    pressedKeyboardDuration: { type: [Number], default: undefined },

                    // Attributes for surveys
                    surveyAnswers: { type: [], default: undefined },
                    isSurveyRadio: { type: Boolean, default: undefined },
                    surveyOptions: { type: [], default: undefined },
                    surveyHeader: { type: [], default: undefined },
                    surveySideText: { type: [], default: undefined },
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

module.exports = schema;