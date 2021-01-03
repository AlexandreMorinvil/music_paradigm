const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Error messages
const titleRequiredMessage = "The title of the curriculum is required";
const titleMinLengthMessage = "The title of the curriculum must contain at least one character";
const titleMaxLengthMessage = "The title of the curriculum must contain a maximum of 100 characters";

const experimentReleaseTimeMinMessage = "The time entered was evaluated to a negative value which could not be processed";
const experimentReleaseTimeMaxMessage = "The time entered was evaluated to a value higher than 24h00 (1440 minutes) which could not be processed";

const textMaxLengthMessage = "The text of the experiments must contain a maximum of 500 characters";

const experimentsValidatorMessage = "At least one experiment must be specified in a curriculum and all experiments must have a unique associative ID";
const experimentAssociativeIdRequiredMessage = "An associative ID must be specified for each experiment";
const experimentsDelauInDaysMinMessage = "The delay in days of the expriment(s) must be greater or equal to 0";
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
            unique: true,
            required: [true, titleRequiredMessage],
            minlength: [1, titleMinLengthMessage],
            maxlength: [100, titleMaxLengthMessage],
            set: setterTitle
        },

        // Indicate whether the experiments are meant to be made accessible one after the other,
        // so that an experiment will be accessible only when the previous one was completed
        isSequential: {
            type: Boolean,
            default: true
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
                        required: [true, experimentAssociativeIdRequiredMessage],
                        set: setterTitle
                    },

                    // Title of the experiment within the curriculum
                    title: {
                        type: String,
                        default: "",
                        sparse: true,
                        trim: true,
                        set: setterTitle
                    },

                    // Number of days after the start date at which the experiment is to be made available
                    delayInDays: {
                        type: Number,
                        default: 0,
                        min: [0, experimentsDelauInDaysMinMessage]
                    },

                    // Time of the day at which the experiment is made available (in minutes from midnight)
                    releaseTime: {
                        type: String,
                        default: '00:00',
                        set: setterTime,
                        validate: validatorTime
                    },

                    // Specify whether this experiment can be completed the same day as another experiment
                    isUniqueIndDay: {
                        type: Boolean,
                        default: true
                    },

                    // Number of times the experiment was completed
                    isCompletionLimited: {
                        type: Boolean,
                        default: true
                    },

                    // Text to show to the user with the experiment
                    text: {
                        type: String,
                        default: "",
                        sparse: true,
                        trim: true,
                        maxlength: [500, textMaxLengthMessage],
                    },

                    // Reference to the experiment
                    experimentReference: {
                        type: Schema.Types.ObjectId,
                        ref: 'Experiment',
                        required: [true, experimentsExperimentReferenceValidatorMessage]
                    },
                }
            ],
            validate: [validatorExperiments, experimentsValidatorMessage]
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
function setterTitle(title) {
    if (title) return title.toLowerCase();
    else return undefined;
}

function setterTime(time) {
    if (typeof time === "number") return '' + ((value / 60) | 0) + ':' + (value % 60);
    else return time;
}

// Validators
function validatorTime(time) {
    let number = 0;
    if (typeof time === 'number') number = time;
    else {
        const numbers = time.split(":");
        number = 60 * Number(numbers[0]) + Number(numbers[1]);
    }
    if (number < 0) throw new Error(experimentReleaseTimeMinMessage);
    if (number > 1440) throw new Error(experimentReleaseTimeMaxMessage);
    return true;
}

function validatorExperiments(array) {
    // Verify the the curriculum contains at least one experiment
    if (array.length <= 0) return false

    // Verify the uniqueness of the associative IDs
    const idArray = [];
    for (experiment of array) idArray.push(experiment.associativeId)
    if (((new Set(idArray)).size !== array.length)) return false

    else return true;
}

schema.set('toJSON', { virtuals: true });

module.exports = schema;