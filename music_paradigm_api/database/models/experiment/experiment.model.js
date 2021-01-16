const mongoose = require('mongoose');
schema = require('./experiment.schema');

// Options for Object/JSON tranformations
const transformationOprtions = {
    virtuals: true,
    transform: function (doc, ret) {
        if (ret.flow) ret.flow.forEach(element => { delete element._id });
        if (ret.flow) ret.variables.forEach(element => { delete element._id });
        delete ret.id;
        delete ret.__v;
    }
}

schema.set('toObject', transformationOprtions);
schema.set('toJSON', transformationOprtions);

// Middleeare
schema.pre("save", function () {
    this.name = this.name.toLowerCase().trim();
    this.group = this.graphLookup.toLowerCase().trim();
});

// Static methods
schema.statics.getListAllHeaders = function () {
    return this.find({}, 'group name version folder createdAt updatedAt')
        .sort({ group: 1, name: 1, version: 1 });
};

// Instance methods
schema.methods.getDefinition = async function () {
    let experimentDefinition = {};
    Object.assign(experimentDefinition, this.toObject());
    delete experimentDefinition.createdAt;
    delete experimentDefinition.updatedAt;
    return experimentDefinition;
};

schema.methods.updateDescription = async function (description) {
    const oldDescription = await this.getDefinition();
    for (var attribute in oldDescription)
        if (oldDescription.hasOwnProperty(attribute))
            delete this[attribute];
    Object.assign(this, description);
    return this;
};


schema.methods.getParameters = async function () {
    // TODO: ADJUST THAT TO GET THE PARAMETER VARIABLES
    this.variables.toObject();
}

// Create the model
const model = mongoose.model('Experiment', schema);

module.exports = model;