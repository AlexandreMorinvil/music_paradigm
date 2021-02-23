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
            default: null
        },

        // Date of the last time the last available experiment was completed for the first time (This is used
        // to for the sequential curriculum to know if a subsequent experiment can be made available)
        lastProgressionDate: {
            type: Date,
            default: null
        },

        // Indicate the values for the experiments with parameters
        curriculumParameters: {
            type: Object,
            default: undefined
        },

        // List of the experiments composing the curriculum
        experiments: {
            type: [
                {
                    // Title of the experiment within the curriculum
                    associativeId: {
                        type: String,
                        default: "",
                        sparse: true,
                        trim: true,
                        set: setterAssociativeId
                    },

                    // Number of times the experiment was started from the start (an experiment can only be start one time more than it was completed)
                    startCount: {
                        type: Number,
                        default: 0,
                        min: 0
                    },

                    // Number of times the experiment was completed (an experiment can not be completed more times than it was started)
                    completionCount: {
                        type: Number,
                        default: 0,
                        min: 0
                    },

                    // Title of the experiment within the curriculum
                    experimentReference: {
                        type: Schema.Types.ObjectId,
                        ref: 'Experiment',
                        required: [true, curriculumRequiredMessage],
                    },

                    // Reference to the log files associated to each completion of the experiment
                    simpleLogReferences: {
                        type: [Schema.Types.ObjectId],
                        ref: 'Log-Simple',
                        default: []
                    },

                    thoroughLogReferences: {
                        type: [Schema.Types.ObjectId],
                        ref: 'Log-Thorough',
                        default: []
                    },

                    // Data to restart a session from where we leave it
                    // Cursor at the position where the experiment was left
                    cursor: {
                        type: Object,
                        default: undefined
                    },

                    // Last state when the experiment was left
                    state: {
                        type: Object,
                        default: undefined
                    },

                    // Log session id of the experiment
                    logId: {
                        type: Object,
                        default: undefined
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

// Setter functions
function setterAssociativeId(title) {
    if (title) return title.toLowerCase();
    else return undefined;
}

schema.set('toJSON', { virtuals: true });

module.exports = schema;