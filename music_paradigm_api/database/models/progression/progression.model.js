const mongoose = require('mongoose');
schema = require('./progression.schema');

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
        assosiativeId: associativeId,
        title: curriculumNestedExperiment.title,
        text: curriculumNestedExperiment.text,
        experiment: await experiment.getDefinition(),
        previousState: progressionNestedExperiment.state || null,
        previousCursor: progressionNestedExperiment.cursor || null,
    };

    return sessionInformation;
};

schema.methods.concludeExperiment = async function (associativeId) {
    const Curriculum = require('database/models/curriculum/curriculum.model');

    const curriculum = await Curriculum.findById(this.curriculumReference);
    const curriculumNestedExperiment = await curriculum.getExperimentAssociated(associativeId);

    const nestedExperimentArray = this.experiments.filter(experiment => { return experiment.associativeId === associativeId; });
    let experimentInProgression = nestedExperimentArray[0];

    // Create a nexted associated experiment to put in the progression
    if (!experimentInProgression) {
        experimentInProgression = {
            associativeId: associativeId,
            completionCount: 1,
            experimentReference: curriculumNestedExperiment.experimentReference
        }
        this.experiments.push(experimentInProgression);
    }
    // Increase previous session's information and increase completion count
    else {
        experimentInProgression.completionCount += 1;
        if (experimentInProgression.cursor) delete experimentInProgression.cursor;
        if (experimentInProgression.state) delete experimentInProgression.state;
    }
    this.lastProgressionDate = Date.now();
    this.save();
    return;
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