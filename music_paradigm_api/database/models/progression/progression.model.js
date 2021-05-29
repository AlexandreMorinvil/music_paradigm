const mongoose = require('mongoose');
schema = require('./progression.middleware');

schema.set('toJSON', { virtuals: true });

// Instance methods
schema.methods.getExperimentAssociated = async function (associativeId) {
    const nestedExperimentArray = this.experiments.filter(experiment => { return experiment.associativeId === associativeId; });
    const experimentInProgression = nestedExperimentArray[0];
    return experimentInProgression;
};

schema.methods.getSessionInformation = async function (associativeId) {
    const Curriculum = require('database/models/curriculum/curriculum.model');
    const Experiment = require('database/models/experiment/experiment.model');
    const ExperimentMaker = require('./experiment-marker/experiment-marker.model');

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumPlannedExperiment = await curriculum.getExperimentAssociated(associativeId);
    const experimentDefinition = await Experiment.findById(curriculumPlannedExperiment.experimentReference);
    const experimentInProgression = await this.getExperimentAssociated(associativeId) || {};
    const experimentMaker = await ExperimentMaker.findMarker(this._id, associativeId) || {};

    const sessionInformation = {
        curriculumTitle: curriculum.title,
        curriculumId: curriculum._id,
        progressionId: this._id,
        associativeId: associativeId,
        startCount: (experimentInProgression.startCount || 0) + 1,
        completionCount: (experimentInProgression.completionCount || 0),
        title: curriculumPlannedExperiment.title,
        text: curriculumPlannedExperiment.text,
        experiment: await experimentDefinition.getDefinition(),
        previousState: experimentMaker.state,
        previousCursor: experimentMaker.cursor,
    };

    return sessionInformation;
};

schema.methods.initializeExperiment = async function (associativeId) {
    const Curriculum = require('database/models/curriculum/curriculum.model');

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumPlannedExperiment = await curriculum.getExperimentAssociated(associativeId);
    let experimentInProgression = await this.getExperimentAssociated(associativeId);

    // Create a nexted associated experiment to put in the progression if it doesn't exist
    if (!experimentInProgression) {

        // Create the experiment in the progression
        experimentInProgression = {
            associativeId : associativeId,
            experimentReference : curriculumPlannedExperiment.experimentReference
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

schema.methods.concludeExperiment = async function (associativeId) {
    const Curriculum = require('database/models/curriculum/curriculum.model');

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumPlannedExperiment = await curriculum.getExperimentAssociated(associativeId);
    let experimentInProgression = await this.getExperimentAssociated(associativeId);

    // Create a nexted associated experiment to put in the progression
    if (!experimentInProgression) {

        // create the experiment in the progression
        experimentInProgression = {
            experimentReference : curriculumPlannedExperiment.experimentReference,
            associativeId : associativeId,
            completionCount : 1
        };

        // Add the record in the progression
        this.experiments.push(experimentInProgression);
    }

    // Erase previous session's information and increase completion count
    else {
        const ExperimentMarker = require('./experiment-marker/experiment-marker.model');
        experimentInProgression.completionCount += 1;
        await ExperimentMarker.deleteMarker(this._id, associativeId);
    }

    // If the experiment was completed for a first, it is a progression in the curriculum, therrefore, we update the last progression time
    if (experimentInProgression.completionCount === 1) this.lastProgressionDate = Date.now();

    return this.save();
};

schema.methods.saveSessionState = async function (associativeId, cursor, state) {
    
    // Error handling if the experiment in progression searched is not found
    const experimentInProgression = await this.getExperimentAssociated(associativeId);
    if (!experimentInProgression) return null;

    // Update or create the marker
    const ExperimentMarker = require('./experiment-marker/experiment-marker.model');

    const experimentMarker = await ExperimentMarker.findMarker(this._id, associativeId);
    if (experimentMarker) experimentMarker.updateMaker(cursor, state);
    else ExperimentMarker.createMaker(this._id, associativeId, cursor, state);

    return this.save();
};

schema.methods.forgetSessionState = async function (associativeId) {
    return await ExperimentMarker.deleteMarker(this._id, associativeId);
};

schema.methods.isForCurriculum = function (curriculumId) {
    return this.curriculumReference === curriculumId;
}

schema.methods.wasStarted = function () {
    return Boolean(this.experiments.length > 0);
};


// Creating the model
const model = mongoose.model('Progression', schema);

module.exports = model;