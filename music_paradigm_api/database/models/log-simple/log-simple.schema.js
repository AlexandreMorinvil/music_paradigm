const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, default: null },
        experimentId: { type: Schema.Types.ObjectId, default: null },
        progressionId: { type: Schema.Types.ObjectId, default: null },
        curriculumId: { type: Schema.Types.ObjectId, default: null },
        associativeId: { type: String, default: undefined },
        associativeIdOrdinalNumber : { type: Number, default: undefined },
        logLabel: { type: String, default: 'default' },
        logTags: { type: [String], default: null },

        startCount: { type: Number, default: 1 },
        completionCount: { type: Number, default: 0 },

        username: { type: String, default: undefined },
        curriculumTitle: { type: String, default: null },
        experimentGroup: { type: String, default: undefined },
        experimentName: { type: String, default: undefined },
        experimentVersion: { type: String, default: undefined },

        blockType: { type: String },
        blockSubType: { type: String },
        index: { type: Number },
        innerIndex: { type: Number },
        repetition: { type: Number },
        isInPrelude: { type: Boolean },
        timestamp: { type: Date },

        // Attributes for piano or keyboard control
        referenceName: { type: String, default: undefined },
        referenceKeys: { type: [], default: undefined },
        referenceTime: { type: [Number], default: undefined },
        referenceDuration: { type: [Number], default: undefined },
        referenceVelocity: { type: [Number], default: undefined },

        pressedStartTime: { type: Date, default: undefined },
        pressedKeys: { type: [], default: undefined },
        pressedTime: { type: [Number], default: undefined },
        pressedDuration: { type: [Number], default: undefined },
        pressedVelocity: { type: [Number], default: undefined },

        // Attributes for surveys
        surveyAnswers: { type: [], default: undefined },
        isSurveyRadio: { type: Boolean, default: undefined },
        surveyOptions: { type: [], default: undefined },
        surveyHeader: { type: [], default: undefined },
        surveySideText: { type: [], default: undefined },
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