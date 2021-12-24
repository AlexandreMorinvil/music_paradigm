const mongoose = require('mongoose');
schema = require('./progression.middleware');

const progressionSetters = require('progressions/progression.setters.js');
const progressionGetters = require('progressions/progression.getters.js');

schema.set('toJSON', { virtuals: true });


// Static methods
schema.statics.create = async function (userId, curriculumId, parameters = null, adjustments = null) {
    const newProgression = new this({ userReference: userId, curriculumReference: curriculumId });
    progressionSetters.setParameters(newProgression, parameters);
    progressionSetters.setAdjustements(newProgression, adjustments);
    return newProgression.save();
};

// Instance 
schema.methods.assignParametersAndAdjustments = async function (parameters = null, adjustments = null) {
    if (adjustments) progressionSetters.setAdjustements(this, adjustments);
    if (parameters) progressionSetters.setParameters(this, parameters);
    return this.save();
};

schema.methods.assignAdjustments = async function (adjustments) {
    if (adjustments) progressionSetters.setAdjustements(this, adjustments);
    return this.save();
};

schema.methods.assignParameters = async function (parameters) {
    if (parameters) progressionSetters.setParameters(this, parameters);
    return this.save();
};

schema.methods.getExperimentAssociated = function (associativeId, associativeIdOrdinalNumber) {
    return progressionGetters.getExperimentAssociated(this, associativeId, associativeIdOrdinalNumber);
};

schema.methods.getSessionInformation = async function (associativeId, associativeIdOrdinalNumber) {
    const Curriculum = require('database/models/curriculum/curriculum.model');
    const Experiment = require('database/models/experiment/experiment.model');
    const ExperimentMaker = require('./experiment-marker/experiment-marker.model');

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumPlannedExperiment = await curriculum.getExperimentAssociated(associativeId);
    const experimentDefinition = await Experiment.findById(curriculumPlannedExperiment.experimentReference);
    const experimentInProgression = this.getExperimentAssociated(associativeId, associativeIdOrdinalNumber) || {};
    const experimentMaker = await ExperimentMaker.findMarker(this._id, associativeId) || {};

    const sessionInformation = {
        curriculumTitle: curriculum.title,
        curriculumId: curriculum._id,
        progressionId: this._id,
        associativeId: associativeId,
        associativeIdOrdinalNumber: associativeIdOrdinalNumber,
        startCount: (experimentInProgression.startCount || 0) + 1,
        completionCount: (experimentInProgression.completionCount || 0),
        title: curriculumPlannedExperiment.title,
        text: curriculumPlannedExperiment.text,
        experiment: experimentDefinition.getDefinition(),
        previousState: experimentMaker.state,
        previousCursor: experimentMaker.cursor,
        previousTimeIndicated: experimentMaker.timeIndicated,
        assignedParameters: this.assignedParameters,
        logType: curriculum.logType
    };

    return sessionInformation;
};

schema.methods.initializeExperiment = async function (associativeId, associativeIdOrdinalNumber) {
    const Curriculum = require('database/models/curriculum/curriculum.model');

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumPlannedExperiment = await curriculum.getExperimentAssociated(associativeId);
    let experimentInProgression = this.getExperimentAssociated(associativeId, associativeIdOrdinalNumber);

    // Create a nexted associated experiment to put in the progression if it doesn't exist
    if (!experimentInProgression) {

        // Create the experiment in the progression
        experimentInProgression = {
            associativeId: associativeId,
            associativeIdOrdinalNumber: associativeIdOrdinalNumber,
            experimentReference: curriculumPlannedExperiment.experimentReference
        };

        // Add the record in the progression
        this.experiments.push(experimentInProgression);
    }

    // Increment the number of times the experiment was started
    experimentInProgression.startCount += 1;

    // If the start time is not set, this is the first time we do an experiment and we are this starting the curriculum now
    if (!this.startTime) this.startTime = Date.now();

    return this.save();
};

schema.methods.concludeExperiment = async function (associativeId, associativeIdOrdinalNumber, isInTimeUp) {
    const Curriculum = require('database/models/curriculum/curriculum.model');

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumPlannedExperiment = await curriculum.getExperimentAssociated(associativeId);
    let experimentInProgression = this.getExperimentAssociated(associativeId, associativeIdOrdinalNumber);

    // Create a nexted associated experiment to put in the progression
    if (!experimentInProgression) {

        // create the experiment in the progression
        experimentInProgression = {
            experimentReference: curriculumPlannedExperiment.experimentReference,
            associativeId: associativeId,
            associativeIdOrdinalNumber: associativeIdOrdinalNumber,
            completionCount: 1
        };

        // Add the record in the progression
        this.experiments.push(experimentInProgression);
    }
    // Increase completion count
    else experimentInProgression.completionCount += 1;

    // Remove the experiment marker if the experiment was completely finished (keep it if it was ended through a timeout)
    const ExperimentMarker = require('./experiment-marker/experiment-marker.model');
    if (!isInTimeUp) {
        await ExperimentMarker.deleteMarker(this._id, associativeId);
    }
    else {
        await ExperimentMarker.forgetTimeLeft(this._id, associativeId);
    }

    // If the experiment was completed for a first, it is a progression in the curriculum, therrefore, we update the last progression time
    if (experimentInProgression.completionCount === 1) this.lastProgressionDate = Date.now();

    return this.save();
};

schema.methods.saveSessionState = async function (associativeId, cursor, state, timeIndicated) {
    const ExperimentMarker = require('./experiment-marker/experiment-marker.model');

    // Update or create the marker
    const experimentMarker = await ExperimentMarker.findMarker(this._id, associativeId);
    if (experimentMarker) experimentMarker.updateMaker(cursor, state, timeIndicated);
    else ExperimentMarker.createMaker(this._id, associativeId, cursor, state, timeIndicated);

    return this.save();
};

schema.methods.forgetSessionState = async function (associativeId) {
    return await ExperimentMarker.deleteMarker(this._id, associativeId);
};

schema.methods.isForCurriculum = function (curriculumId) {
    return String(this.curriculumReference) === String(curriculumId);
}

schema.methods.wasStarted = function () {
    return Boolean(this.experiments.length > 0);
};

schema.methods.getAssignedParameters = function () {
    return this.assignedParameters;
};


// Creating the model
const model = mongoose.model('Progression', schema);

module.exports = model;