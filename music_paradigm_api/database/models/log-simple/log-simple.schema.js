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

        startCount: { type: Number, default: 1 },
        completionCount: { type: Number, default: 0 },

        username: { type: String, default: undefined },
        curriculumTitle: { type: String, default: null },
        experimentGroup: { type: String, default: undefined },
        experimentName: { type: String, default: undefined },
        experimentVersion: { type: Number, default: undefined },

        blockType: { type: String },
        blockSubType: { type: String },
        index: { type: Number },
        innerIndex: { type: Number },
        repetition: { type: Number },
        isInPrelude: { type: Boolean },
        timestamp: { type: Date },

        referenceName: { type: String, default: null },
        referenceKeys: { type: [], default: [] },
        referenceTime: { type: [Number], default: undefined },
        referenceDuration: { type: [Number], default: undefined },
        referenceVelocity: { type: [Number], default: undefined },

        pressedStartTime: { type: Date, default: null },
        pressedKeys: { type: [], default: [] },
        pressedTime: { type: [Number], default: [] },
        pressedDuration: { type: [Number], default: [] },
        pressedVelocity: { type: [Number], default: undefined },
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