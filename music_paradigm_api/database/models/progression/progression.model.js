const mongoose = require('mongoose');
schema = require('./progression.middleware');

const progressionSetters = require('./progression.setters.js');
const progressionGetters = require('./progression.getters.js');

schema.set('toJSON', { virtuals: true });


// Static methods
schema.statics.assignParametersToProgression = async function (progressionId, assignedParameters) {
    const progression = await this.findById(progressionId);
    return progression.assignParameters(assignedParameters);
};

schema.statics.createProgression = async function (userId, curriculumId, parameters = null, adjustments = null) {
    const newProgression = new this({ userReference: userId, curriculumReference: curriculumId });
    if (parameters) progressionSetters.setParameters(newProgression, parameters);
    if (adjustments) progressionSetters.setAdjustements(newProgression, adjustments);
    return newProgression.save();
};

schema.statics.deleteNotStartedProgressionsOfUser = async function (userId) {
    return this.deleteMany({ userReference: userId, startTime: null });
};

schema.statics.getLastProgressionOfUser = async function (userId) {
    return this.findOne({ userReference: userId }, '-createdAt');
}

schema.statics.getProgressionAndCurriculumById = async function (progressionId) {

    // Fetch the progression and the curriculum    
    const progression = await this.findById(progressionId)
        .populate({ path: 'curriculumReference' });
    const { curriculumReference } = progression;
    const curriculum = curriculumReference;
    progression.curriculumReference = curriculum._id; 

    return {
        curriculum: curriculum ? curriculum.toObject() : null,
        progression: progression ? progression.toObject() : null,
    }
};

// Instance methods
schema.methods.assignAdjustments = async function (adjustments) {
    if (adjustments) progressionSetters.setAdjustements(this, adjustments);
    return this.save();
};

schema.methods.assignParameters = async function (parameters) {
    if (parameters) progressionSetters.setParameters(this, parameters);
    return this.save();
};

schema.methods.getCurriculum = async function () {
    await model.populate(this, { path: 'curriculumReference' });
    const curriculum = this.curriculumReference;
    this.curriculumReference = curriculum._id;
    return curriculum;
};

schema.methods.getExperimentAssociated = function (associativeId, associativeIdOrdinalNumber) {
    return progressionGetters.getExperimentAssociated(this, associativeId, associativeIdOrdinalNumber);
};

schema.methods.isForCurriculum = function (curriculumId) {
    return String(this.curriculumReference) === String(curriculumId);
}

schema.methods.isStarted = function () {
    return Boolean(this.experiments.length > 0);
};

// Creating the model
const model = mongoose.model('Progression', schema);

module.exports = model;