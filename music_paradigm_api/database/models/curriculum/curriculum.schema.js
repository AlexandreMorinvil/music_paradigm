const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * The curriculums are a collection of experiments that are made availale according to a set of rules
 * 
 * The curriculums are independant and reusable ressources, as such templates of the existing types of
 * curriculums are stored in the database. Thus, a model of this schema is created for this schema.
 */
const schema = new Schema(
    {

        // Title of the curriculum
        title: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        // Indicate whether the experiments are meant to be made accessible one after the other,
        // so that an experiment will be accessible only when the previous one was completed
        isSequential: {
            type: Boolean,
            default: true
        },

        // List of the experiments composing the curriculum
        experiments: [
            {
                // Title of the experiment within the curriculum
                title: {
                    type: String,
                    required: true,
                    sparse: true,
                    trim: true
                },

                //  === Paths to schedule when the experiment will be available ===
                // Number of days after the start date at which the experiment is to be made available
                delayInDays: {
                    type: Number,
                    default: 0,
                    min: 0
                },

                // Specify whether this experiment can be completed the same day as another experiment
                isUniqueIndDay: {
                    type: Boolean,
                    default: true
                },

                // === Paths to limit the amount of repetitions of an experiment ===
                // Number of times the experiment is meant to be completed minimally
                completionTarget: {
                    type: Number,
                    default: 1,
                    min: 1
                },

                // Number of times the experiment was completed
                completionLimit: {
                    type: Number,
                    default: function () { return this.completionTarget; },
                    min: 0,
                    validate: {
                        validator: validatorCompletionLimit,
                        message: "The completion limmit cannot be lower than the completion target"
                    },
                },

                // Reference to the experiment
                experimentReference: {
                    type: Schema.Types.ObjectId,
                    ref: 'Experiment'
                },
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

// Validator
function validatorCompletionLimit(value) {
    return value >= this.completionTarget;
}

schema.set('toJSON', { virtuals: true });

module.exports = schema;