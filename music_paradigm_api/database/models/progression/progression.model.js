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

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumNestedExperiment = await curriculum.getExperimentAssociated(associativeId);
    const experiment = await Experiment.findById(curriculumNestedExperiment.experimentReference);
    const progressionNestedExperiment = await this.getExperimentAssociated(associativeId) || {};

    const sessionInformation = {
        curriculumTitle: curriculum.title,
        curriculumId: curriculum._id,
        associativeId: associativeId,
        title: curriculumNestedExperiment.title,
        text: curriculumNestedExperiment.text,
        experiment: await experiment.getDefinition(),
        previousState: progressionNestedExperiment.state || null,
        previousCursor: progressionNestedExperiment.cursor || null,
    };

    return sessionInformation;
};

schema.methods.initializeExperiment = async function (associativeId) {
    const Curriculum = require('database/models/curriculum/curriculum.model');
    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumNestedExperiment = await curriculum.getExperimentAssociated(associativeId);
    let experimentInProgression = await this.getExperimentAssociated(associativeId);

    // Create a nexted associated experiment to put in the progression if it doesn't exist
    if (!experimentInProgression) {
        experimentInProgression = {
            experimentReference: curriculumNestedExperiment.experimentReference,
            associativeId: associativeId,
            completionCount: 0,
        }
        this.experiments.push(experimentInProgression);
    }
    // Increment the number of times the experiment was started to be one more time than it was completed
    else {
        const completionCount = Math.max(experimentInProgression.completionCount, 0);
        experimentInProgression.startCount = completionCount + 1;
    }

    // If the start time is not set, this is the first time we do an experiment and we are this starting the curriculum now
    if (!this.startTime) this.startTime = Date.now();

    return this.save();
};

schema.methods.concludeExperiment = async function (associativeId) {
    const Curriculum = require('database/models/curriculum/curriculum.model');
    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumNestedExperiment = await curriculum.getExperimentAssociated(associativeId);
    let experimentInProgression = await this.getExperimentAssociated(associativeId);

    // Create a nexted associated experiment to put in the progression
    if (!experimentInProgression) {
        experimentInProgression = {
            experimentReference: curriculumNestedExperiment.experimentReference,
            associativeId: associativeId,
            completionCount: 1,
        }
        this.experiments.push(experimentInProgression);
    }
    // Erase previous session's information and increase completion count
    else {
        experimentInProgression.completionCount += 1;
        if (experimentInProgression.cursor) delete experimentInProgression.cursor;
        if (experimentInProgression.state) delete experimentInProgression.state;
        if (experimentInProgression.logId) delete experimentInProgression.logId;
    }

    // If the experiment was completed for a first, it is a progression in the curriculum, therrefore, we update the last progression time
    if (experimentInProgression.completionCount === 1) this.lastProgressionDate = Date.now();

    return this.save();
};

schema.methods.addSimpleLogBlockAssociatedExperiment = async function (logBock) {
    // Get experiment associated
    associativeId = logBock.associativeId;
    if (!associativeId) throw new Error('No associative ID')

    // Add the log block to the progression
    const progressionNestedExperiment = await this.getExperimentAssociated(associativeId);
    progressionNestedExperiment.simpleLogReferences.push(logBock._id);
    await progressionNestedExperiment.save();
    return await this.save();
};

schema.methods.addThoroughLogAssociatedExperiment = async function (associativeId, logId) {
    if (!associativeId) throw new Error('No associative ID')

    // Add the initialized log to the progression
    const progressionNestedExperiment = await this.getExperimentAssociated(associativeId);
    progressionNestedExperiment.thoroughLogReferences.push(logId);
    await progressionNestedExperiment.save();
    return await this.save();
};

schema.methods.saveSessionState = async function (associativeId, cursor, state) {
    let experimentInProgression = await this.getExperimentAssociated(associativeId);

    // Error handling if the experiment in progression searched is not found
    if (!experimentInProgression) return null;

    // We set the cursor and the current state
    experimentInProgression.cursor = cursor;
    experimentInProgression.state = state;

    return this.save();
};


schema.methods.forgetSessionState = async function (associativeId) {
    let experimentInProgression = await this.getExperimentAssociated(associativeId);

    // Error handling if the experiment in progression searched is not found
    if (!experimentInProgression) return null;

    // We delete the cursor amd the current state
    experimentInProgression.cursor = undefined;
    experimentInProgression.state = undefined;

    return this.save();
};


schema.methods.isForCurriculum = function (curriculumId) {
    return this.curriculumReference === curriculumId;
}

schema.methods.wasStarted = function () {
    return Boolean(this.experiments[0]);
};


// Creating the model
const model = mongoose.model('Progression', schema);

module.exports = model;