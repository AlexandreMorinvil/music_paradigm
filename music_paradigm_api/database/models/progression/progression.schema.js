const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * The progressions contain the informations concerning the completion of the experiments of a curriculum for given user.
 * 
 * The progression are dependant upon the user concerned and as such they can be interacted with only through the user whom 
 * it tracks the progression. Thus, a model of this schema is not created as it does not belong to its own collection.
 */
const schema = new Schema(
    {
        // TODO: In the toObject and to toJSON, make sure the user is not populated
        referenceUser: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        
        // Indicate the start time of the curriculum. The delays in days are counted starting from that date
        startTime: {
            type: Date,
            default: Date.now
        },

        // Date of the last time the last available experiment was completed for the first time (This is used
        // to for the sequential curriculum to know if a subsequent experiment can be made available)
        lastProgressionDate: {
            type: Date,
            default: Date.now
        },

        // List of the experiments composing the curriculum
        experiments: [
            {
                // Title of the experiment within the curriculum
                title: {
                    type: String,
                    unique: true,
                    sparse: true
                },

                // Number of times the experiment was completed
                completionCount: {
                    type: Number,
                    default: 0,
                    min: 0
                },

                // Paths to save the state of an ongoing session
                sessionStatus: {
                    hasSessionInProgress: {
                        type: Boolean,
                        default: false
                    },
                    cursor: {
                        type: Object,
                        default: null
                    },
                    state: {
                        type: Object,
                        default: null
                    }
                },

                // Reference to the log files associated to each completion of the experiment
                logReference: {
                    type: Schema.Types.ObjectId,
                    ref: 'Completion'
                }
            }
        ]

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