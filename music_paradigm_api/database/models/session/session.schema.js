const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, default: null },
        experimentId: { type: Schema.Types.ObjectId, default: null },

        username: { type: String, default: undefined },
        experimentGroup: { type: String,  default: undefined },
        experimentName: { type: String,  default: undefined },
        experimentVersion: { type: Number, default: undefined },

        startTimestamp: { type: [Date], default: Date.now },
        endTimestamp: { type: Date, default: null },

        // List of blocks encountered in the session
        states: {
            type: [
                {
                    blockType: { type: String },
                    timestamp: { type: Date },
                    notes: { type: Object, default: null },
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

module.exports = schema;