const mongoose = require('mongoose');
const schema = require('./curriculum.schema');

schema.set('toJSON', { virtuals: true });

// Static methods
schema.statics.getListAllHeaders = async function () {
    const curriculumList = await this.find({}).sort({ updatedAt: -1, createdAt: 1, title: 1 });
    const curriculumHeaderList = [];

    curriculumList.forEach(element => {
        const curriculumHeader = element.toObject();
        curriculumHeader.experimentsCount = curriculumHeader.experiments.length;
        delete curriculumHeader.experiments;
        curriculumHeaderList.push(curriculumHeader);
    });
    return curriculumHeaderList;
};

// Instance methods
schema.methods.getExperimentAssociated = async function (associativeId) {
    const experimentArrayCurriculum = this.experiments.filter(experiment => { return experiment.associativeId === associativeId; });
    const experimentInCurriculum = experimentArrayCurriculum[0];
    return experimentInCurriculum;
};

schema.methods.update = async function (updatedCurriculum) {
    if (updatedCurriculum.hasOwnProperty('title')) this.title = updatedCurriculum.title;
    if (updatedCurriculum.hasOwnProperty('isSequential')) this.isSequential = updatedCurriculum.isSequential;
    if (updatedCurriculum.hasOwnProperty('experiments')) this.experiments = updatedCurriculum.experiments;

    return this;
};


// Creating the model
const model = mongoose.model('Curriculum', schema);

module.exports = model;