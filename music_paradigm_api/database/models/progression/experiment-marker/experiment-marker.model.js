const mongoose = require('mongoose');
schema = require('./experiment-marker.middleware');

schema.set('toJSON', { virtuals: true });

// Static methods

schema.statics.createMaker = async function (progressionReference, associativeId, cursor, state) {
    const marker = {
        progressionReference: progressionReference,
        associativeId: associativeId,
        cursor: cursor,
        state: state,
    }
    this.create(marker);
}

schema.statics.findMarker = async function (progressionReference, associativeId) {
    return await this.findOne({
        progressionReference: progressionReference,
        associativeId: associativeId
    });
}

schema.statics.deleteMarker = async function (progressionReference, associativeId) {
    return await this.deleteOne({
        progressionReference: progressionReference,
        associativeId: associativeId
    });
};

// Instance methods

// We set the cursor and the current state
schema.methods.updateMaker = async function (cursor, state) {
    this.cursor = cursor;
    this.state = state;

    return this.save();
};

// Creating the model
const model = mongoose.model('Experiment-Marker', schema);

module.exports = model;