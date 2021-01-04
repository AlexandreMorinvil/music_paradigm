const mongoose = require('mongoose');
schema = require('./curriculum.schema');

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
    const experimentArray = this.experiments.filter(experiment => { return experiment.associativeId === associativeId; });
    let experiment = experimentArray[0];
    console.log(experiment)

    console.log(this);

    const abc = this.populate('experiments');
    console.log(abc);

    // experiment.populate({ path: 'experimentReference' }); doc.arr[0].populate(\"path\")
    // Mongoose does not support calling populate() on nested docs. Instead of `doc.arr[0].populate(\"path\")`, use `doc.populate(\"arr.0.path\")`
    // console.log(experiment)

    return experiment;
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