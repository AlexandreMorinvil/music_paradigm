const mongoose = require('mongoose');
schema = require('./progression.middleware');

const progressionSetters = require('./progression.setters.js');
const progressionGetters = require('./progression.getters.js');

schema.set('toJSON', { virtuals: true });

// Static methods
schema.statics.assignSessionAdjustmentsToProgression = async function (progressionId, sessionIdentifier, adjustments) {
    const progression = await this.findById(progressionId);
    return progression.assignSessionAdjustments(sessionIdentifier, adjustments);
};

schema.statics.assignParametersToProgression = async function (progressionId, assignedParameters) {
    const progression = await this.findById(progressionId);
    return progression.assignParameters(assignedParameters);
};

schema.statics.createProgression = async function (userId, curriculumId, parameters = null) {
    const newProgression = new this({ userReference: userId, curriculumReference: curriculumId });
    if (parameters) progressionSetters.setParameters(newProgression, parameters);
    return newProgression.save();
};

schema.statics.deleteNotStartedProgressionsOfUser = async function (userId) {
    return this.deleteMany({ userReference: userId, startTime: null });
};

schema.statics.getActiveProgressionByUserId = async function (userId) {
    return this.findOne({ userReference: userId }, '-createdAt');
}

schema.statics.getActiveProgressionAndCurriculumByUserId = async function (userId) {
    const progression = await model.getActiveProgressionByUserId(userId);
    const curriculum = progression ? (await progression.getCurriculum()) : null;

    return {
        curriculum: curriculum ?? null,
        progression: progression ?? null,
    };
}

schema.statics.getProgressionAndCurriculumById = async function (progressionId) {

    // Fetch the progression and the curriculum    
    const progression = await this.findById(progressionId)
        .populate({ path: 'curriculumReference' });
    const curriculum = progression.curriculumReference;
    progression.curriculumReference = curriculum._id; 

    return {
        curriculum: curriculum ?? null,
        progression: progression ?? null,
    }
};

// Instance methods
schema.methods.assignSessionAdjustments = async function (sessionIdentifier, adjustments) {
    progressionSetters.setSessionAdjustements(this, sessionIdentifier, adjustments);
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