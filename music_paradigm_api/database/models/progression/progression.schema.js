const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Error messages
const userRequiredMessage = "The user Object ID of the user progressing in the curriculum is required";
const curriculumRequiredMessage = "The curriculum Object ID of the associated curriculum is required";

/**
 * The progressions contain the informations concerning the completion of the experiments of a curriculum for given user.
 * 
 * The progression are dependant upon the user concerned and as such they can be interacted with only through the user whom 
 * it tracks the progression. Thus, a model of this schema is not created as it does not belong to its own collection.
 */
const schema = new Schema(
    {
        userReference: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, userRequiredMessage],
        },

        curriculumReference: {
            type: Schema.Types.ObjectId,
            ref: 'Curriculum',
            required: [true, curriculumRequiredMessage],
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
            default: null
        },

        // List of the experiments composing the curriculum
        experiments: {
            type: [
                {
                    // Title of the experiment within the curriculum
                    experimentReference: {
                        type: Schema.Types.ObjectId,
                        ref: 'Curriculum',
                        required: [true, curriculumRequiredMessage],
                    },

                    // Number of times the experiment was completed
                    completionCount: {
                        type: Number,
                        default: 0,
                        min: 0
                    },

                    // Paths to save the state of an ongoing session
                    ongoingSessionStatus: {
                        type: {
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
                        default: null
                    },

                    // Reference to the log files associated to each completion of the experiment
                    logReference: {
                        type: Schema.Types.ObjectId,
                        ref: 'Completion'
                    }
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