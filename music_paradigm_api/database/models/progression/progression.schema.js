const mongoose = require('mongoose');
const ProgressionExperiment = require('./progression-experiment/progression-experiment.schema');

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

        adjustmentStartTimeInDays: {
            type: Number,
            default: 0
        },

        // Date of the last time the last available experiment was completed for the first time (This is used
        // to for the sequential curriculum to know if a subsequent experiment can be made available)
        lastProgressionDate: {
            type: Date,
            default: null
        },

        // Indicate the values for the experiments with parameters
        assignedParameters: {
            type: Object, // { VARIABLE_NAME: IMPOSED_VALUE, ... }
            default: null
        },

        // List of the experiments composing the curriculum
        experiments: {
            type: [ProgressionExperiment],
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

// Virtual properties
schema.virtual('startTimePassed').get(function() {
    return (new Date()).getTime() - (new Date(this.startTime)).getTime()
});

schema.virtual('lastProgessionTimePassed').get(function() {
    return (new Date()).getTime() - (new Date(this.lastProgressionDate)).getTime()
});

schema.set('toJSON', { virtuals: true });

module.exports = schema;