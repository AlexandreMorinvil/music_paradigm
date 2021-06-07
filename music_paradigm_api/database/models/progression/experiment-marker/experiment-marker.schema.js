const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Error messages
const progressionReferenceRequiredMessage = "The progression reference in the experiment marker is requiered";
const experimentAssociativeIdRequiredMessage = "An associative ID must be specified in the experiment marker";

// Data to restart a session from where we leave it
const schema = new Schema(
    {
        // Composed Primary key
        progressionReference : {
            type: Schema.Types.ObjectId,
            ref: 'Progression',
            required: [true, progressionReferenceRequiredMessage]
        },

        associativeId : {
            type: String,
            required: [true, experimentAssociativeIdRequiredMessage]
        },

        // Maker elements
        // Last cursor when the experiment was left
        cursor: {
            type: Object,
            default: undefined
        },

        // Last state when the experiment was left
        state: {
            type: Object,
            default: undefined
        },

        timeIndicated: {
            type: Number,
            default: null 
        },
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