const mongoose = require('mongoose');
schema = require('./progression.middleware');

const progressionSetters = require('progressions/progressions.setters.js');
const progressionGetters = require('progressions/progressions.getters.js');

schema.set('toJSON', { virtuals: true });


// Static methods
schema.statics.create = async function (userId, curriculumId, parameters = null, adjustments = null) {
    const newProgression = new this({ userReference: userId, curriculumReference: curriculumId });
    progressionSetters.setParameters(newProgression, parameters);
    progressionSetters.setAdjustements(newProgression, adjustments);
    return newProgression.save();
};

// Instance methods
schema.methods.assignParameters = async function (parameters) {
    if (parameters) progressionSetters.setParameters(this, parameters);
    return this.save();
};

schema.methods.assignAdjustments = async function (adjustments) {
    if (adjustments) progressionSetters.setAdjustements(this, adjustments);
    return this.save();
};

schema.methods.getExperimentAssociated = function (associativeId, associativeIdOrdinalNumber) {
    return progressionGetters.getExperimentAssociated(this, associativeId, associativeIdOrdinalNumber);
};

schema.methods.isForCurriculum = function (curriculumId) {
    return String(this.curriculumReference) === String(curriculumId);
}

schema.methods.wasStarted = function () {
    return Boolean(this.experiments.length > 0);
};

// Creating the model
const model = mongoose.model('Progression', schema);

module.exports = model;