const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema(
    {

        // Id associated to the experiment within the curriculum
        associativeId: {
            type: String,
            default: "",
            sparse: true,
            trim: true,
            set: setterAssociativeId
        },

        // Ordinal number indicating the number of times the associative ID was encountered in the curriculum before this one
        associativeIdOrdinalNumber: {
            type: Number,
            default: 0,
            min: 0
        },

        // Dates where the experiment was started
        startCount: {
            type: Number,
            default: 0,
            min: 0
        },

        startDates: {
            type: [Date],
            default: [],
        },

        // Dates where the experiment was completed
        completionCount: {
            type: Number,
            default: 0,
        },

        completionDates: {
            type: [Date],
            default: [],
        },

        // Adjustments
        adjustmentDelayInDays: {
            type: Number,
            default: 0,
        },

        adjustmentConsiderCompleted: {
            type: Boolean,
            default: false,
        },

        adjustmentAdditionalCompletionsRequired: {
            type: Number,
            min: 0,
            default: 0,
        },

        adjustmentPreponeAvailability: {
            type: Boolean,
            default: false,
        },

        adjustmentOverlookUniqueInDays: {
            type: Boolean,
            default: false,
        },

        adjustmentImposeReadyToBeDone: {
            type: Boolean,
            default: false,
        },

        adjustmentBlockAvailability: {
            type: Boolean,
            default: false,
        },

        adjustmentRemoveCompletionLimit: {
            type: Boolean,
            default: false,
        },

        // Title of the experiment within the curriculum
        experimentReference: {
            type: Schema.Types.ObjectId,
            ref: 'Experiment',
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

// Virtual properties

schema.virtual('isCompleted').get(function () {
    return this.completionCount >= this.completionsNeeded || this.adjustmentConsiderCompleted;
});


schema.virtual('completionsNeeded').get(function () {
    return 1 + this.adjustmentAdditionalCompletionsRequired;
});

// This is not used for backward compatibility. Moreover, changes to those two attributes would require serious
// testing to ensure that all logs, user progressions and admin displays continue working as they should
// schema.virtual('startCount').get(function() {
//     return this.startDates.length;
// });
// schema.virtual('completionCount').get(function() {
//     return this.completionDates.length;
// });

schema.virtual('initialStartDate').get(function () {
    return this.startDates[0] || null;
});

schema.virtual('advanceCompeletionDate').get(function () {
    const advanceCompeletionDate = this.completionDates[this.completionsNeeded - 1];
    return advanceCompeletionDate ? advanceCompeletionDate : this.completionDates[this.completionDates.length - 1];
});



// Setter functions
function setterAssociativeId(title) {
    if (title) return title.toLowerCase();
    else return undefined;
}

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

module.exports = schema;