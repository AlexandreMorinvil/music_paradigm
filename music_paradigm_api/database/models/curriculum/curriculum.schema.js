const mongoose = require('mongoose');
// const Experiment = require('database/db').Experiment;
const Experiment = require('database/models/experiment/experiment.model');

const Schema = mongoose.Schema;

// Error messages
const titleRequiredMessage = "The title of the curriculum is required";
const titleUnivqueMessage = "The title of the curriculum is already used";
const titleMinLengthMessage = "The title of the curriculum must contain at least one character";
const titleMaxLengthMessage = "The title of the curriculum must contain a maximum of 100 characters";

const experimentDelauInDaysMinMessage = "The delay in days of the expriment(s) must be greater or equal to 0";
const experimentCompletionTargetMinMessage = "The completion target of the expriment(s) must be greater or equal to 0";
const experimentsCompletionLimitMinMessage = "The completion limit of the expriment(s) must be greater or equal to 0";
const experimentsCompletionLimitValidatorMessage = "The completion limmit of the experiments cannot be lower than the completion target";
const experimentsExperimentReferenceValidatorMessage = "The experiment reference must be specified";

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
            sparse: true,
            trim: true,
            required: [true, titleRequiredMessage],
            unique: [true, titleUnivqueMessage],
            minlength: [1, titleMinLengthMessage],
            maxlength: [100, titleMaxLengthMessage],
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
                    default: "",
                    sparse: true,
                    trim: true
                },

                //  === Paths to schedule when the experiment will be available ===
                // Number of days after the start date at which the experiment is to be made available
                delayInDays: {
                    type: Number,
                    default: 0,
                    min: [0, experimentDelauInDaysMinMessage]
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
                    min: [0, experimentCompletionTargetMinMessage]
                },

                // Number of times the experiment was completed
                completionLimit: {
                    type: Number,
                    default: defaultCompletionLimit,
                    min: [0, experimentsCompletionLimitMinMessage],
                    validate: {
                        validator: validatorCompletionLimit,
                        message: experimentsCompletionLimitValidatorMessage
                    },
                },

                // Reference to the experiment
                experimentReference: {
                    type: Schema.Types.ObjectId,
                    ref: 'Experiment',
                    required: [true, experimentsExperimentReferenceValidatorMessage]
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

// Computed default values
function defaultCompletionLimit() {
    return this.completionTarget;
}

// Setter functions


// Validator
function validatorCompletionLimit(value) {
    return value >= this.completionTarget;
}

schema.set('toJSON', { virtuals: true });

module.exports = schema;