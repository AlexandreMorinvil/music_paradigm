const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * The curriculums are a collection of experiments that are made availale according to a set of rules
 * 
 * The curriculums are independant and reusable ressources, as such templates of the existing types of
 * curriculums are stored in the database. Thus, a model of this schema is created for this schema.
 */
const schemaCurriculum = new Schema({

    // Title of the curriculum
    title: { type: String, unique: true },

    // Indicate whether the experiments are meant to be made accessible one after the other,
    // so that an experiment will be accessible only when the previous one was completed
    isSequential: { type: Boolean, default: true },

    // List of the experiments composing the curriculum
    experiments: [
        {
            // Title of the experiment within the curriculum
            title: { type: String, unique: true },

            // Paths to schedule when the experiment will be available
            delayInDays: { type: Number, default: 0 },              // Number of days after the start date at which the experiment is to be made available
            isUniqueIndDay: { type: Boolean, default: false },      // Specify whether this experiment can be completed the same day as another experiment

            // Paths to limit the amount of repetitions of an experiment
            completionTarget: { type: Number, default: 1, min: 0 }, // Number of times the experiment is meant to be completed minimally
            completionLimit: { type: Number, default: 1, min: 0 },  // Number of times the experiment was completed

            // Reference to the experiment
            experimentReference: {
                $ref: { type: String, default: "experiments" },
                $id: { type: String, required: true }
            },
        }
    ]
});

/**
 * The progressions contain the informations concerning the completion of the experiments of a curriculum for given user.
 * 
 * The progression are dependant upon the user concerned and as such they can be interacted with only through the user whom 
 * it tracks the progression. Thus, a model of this schema is not created as it does not belong to its own collection.
 */
const schemaProgression = new Schema({

    // Indicate the start time of the curriculum. The delays in days are counted starting from that date
    startTime: { type: Date, default: Date.now },

    // Date of the last time the last available experiment was completed for the first time (This is used
    // to for the sequential curriculum to know if a subsequent experiment can be made available)
    lastProgressionDate: { type: Date, default: Date.now },

    // List of the experiments composing the curriculum
    experiments: [
        {
            // Title of the experiment within the curriculum
            title: { type: String, unique: true },

            // Number of times the experiment was completed
            completionCount: { type: Number, default: 0, min: 0 },

            // Paths to save the state of an ongoing session
            sessionStatus: {
                hasSessionInProgress: { type: Boolean, default: false },
                cursor: { type: Object, default: null },
                state: { type: Object, default: null }
            },

            // Reference to the log files associated to each completion of the experiment
            logReference: {
                $ref: { type: String, default: "sessionLog" },
                $id: { type: String, default: "UNSET" }
            }
        }
    ]

});

schemaCurriculum.set('toJSON', { virtuals: true });
schemaProgression.set('toJSON', { virtuals: true });

const model = mongoose.model('Curriculum', schemaCurriculum, 'curriculums');

module.exports = {
    schemaCurriculum: schemaCurriculum,
    schemaProgression: schemaProgression,
    model: model
}