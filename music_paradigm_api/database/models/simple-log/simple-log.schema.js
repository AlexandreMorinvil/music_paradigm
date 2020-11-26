const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, default: null },
        experimentId: { type: Schema.Types.ObjectId, default: null },

        username: { type: String, default: undefined },
        experimentGroup: { type: String, default: undefined },
        experimentName: { type: String, default: undefined },
        experimentVersion: { type: Number, default: undefined },

        blockType: { type: String },
        blockSubType: { type: String },
        timestamp: { type: Date },

        referenceName: { type: String, default: null },
        referenceMidi: { type: [Number], default: [] },
        referenceTime: { type: [Number], default: [] }, 
        referenceDuration: { type: [Number], default: [] },
        referenceVelocity: { type: [Number], default: [] }, 

        playedStartTime: { type: Date, default: null },
        playedMidi: { type: [Number], default: [] },
        playedTime: { type: [Number], default: [] },
        playedVelocity: { type: [Number], default: [] },
        playedDuration: { type: [Number], default: [] },
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