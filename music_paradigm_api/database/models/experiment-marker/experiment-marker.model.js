const mongoose = require('mongoose');
schema = require('./experiment-marker.middleware');

schema.set('toJSON', { virtuals: true });

// Static methods

schema.statics.createMaker = async function (progressionReference, associativeId, cursor, state, timeIndicated) {
    const marker = {
        progressionReference: progressionReference,
        associativeId: associativeId,
        cursor: cursor,
        state: state,
        timeIndicated: timeIndicated,
    }
    this.create(marker);
}

schema.statics.findMarkers = async function (progressionReference) {
    return this.find({
        progressionReference: progressionReference,
    });
}

schema.statics.findMarker = async function (progressionReference, associativeId) {
    return this.findOne({
        progressionReference: progressionReference,
        associativeId: associativeId
    });
}

schema.statics.deleteMarker = async function (progressionReference, associativeId) {
    return this.deleteOne({
        progressionReference: progressionReference,
        associativeId: associativeId
    });
};

schema.statics.forgetTimeLeft = async function (progressionReference, associativeId) {
    return this.updateOne({
        progressionReference: progressionReference,
        associativeId: associativeId
    }, {
        $set: { timeIndicated: null }
    }
    )
}

// Instance methods

// We set the cursor and the current state
schema.methods.updateMarker = async function (cursor, state, timeIndicated) {
    this.cursor = cursor;
    this.state = state;
    this.timeIndicated = timeIndicated;

    return this.save();
};

// Creating the model
const model = mongoose.model('Experiment-Marker', schema);

module.exports = model;