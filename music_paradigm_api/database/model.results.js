// TODO: Erase this for the improved "Log" Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //common
    userId: { type: String, required: true},
    username: { type: String, required: true },
    loggedDate: { type: Date, default: Date.now },
    experimentMode: {type: String},
    experimentFolder: {type: String},
    expBlockNum: {type: Number},
    expMidiFileName: {type: String},
    playedNotes: {type: Object},
    playedOnsets: {type: Object},
    playedOffsets: {type: Object},
    playedVelocities: {type: Object},
    //task 1
    speedW: {type: Number}, //corrects
    sequenceDurations: {type: Object}, // array of ms
    speedD: {type: Number}, //ms
    accuracyW: {type: Number}, //incorrects
    transitionSpeeds: {type: Object}, //array of array of ms
    transitionSpeedMean: {type: Object},
    //task 2
    pitchErrorNum: {type: Number}, //errors
    missedNotes: {type: Object}, //array of number
    missedNoteNum: {type: Number}, //notes
    IOIs: {type: Object}, //array of ms
    IOImean: {type: Number}, //ms
    IOIsd: {type: Number},
    IOIcv: {type: Number},
    sequenceDuration: {type: Number}, //ms
    above50sFlag: {type: Boolean},
    pitchAcc: {type: Number}, //%
    rhythmDiff: {type: Number}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Result', schema);