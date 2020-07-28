const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    startTime: { 
        type: Date,
        required: true,
        default: Date.now
    },
    lastSessionDate: {
        type: Date,
        required: true,
        default: Date.now
    },

    sessions: [
        {
            // Attributes to limit the amount of repetitions of an experiment
            completionCount: { 
                type: Number,
                required: true,
                default: 0 
            },
            completionLimit: { 
                type: Number,
                required: true,
                default: 1 
             },
            
            // Attributes to specify the time at which an experiment is made available
            delayInDays: { 
                type: Number,
                required: true,
                default: 0
            },



            experimentReference: {
                $ref: {
                    type: String,
                    required: true,
                    default: "experiments"
                },
                $id: {
                    type: String,
                    required: true,
                }
            }
        }
    ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Curriculum', schema);