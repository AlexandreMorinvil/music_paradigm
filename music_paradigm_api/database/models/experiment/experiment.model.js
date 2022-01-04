const mongoose = require('mongoose');
schema = require('./experiment.middleware');

// Options for Object/JSON tranformations
const transformationOprtions = {
    virtuals: true,
    transform: function (doc, ret) {
        if (ret.flow) ret.flow.forEach(element => { delete element._id });
        if (ret.flowPrelude) ret.flowPrelude.forEach(element => { delete element._id });
        if (ret.variables) ret.variables.forEach(element => { delete element._id });
        if (ret.timeUpState) delete ret.timeUpState._id;
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
schema.methods.getDefinition = function () {
    let experimentDefinition = {};
    Object.assign(experimentDefinition, this.toObject());
    delete experimentDefinition.createdAt;
    delete experimentDefinition.updatedAt;
    return experimentDefinition;
};

schema.methods.updateDescription = function (description) {
    const oldDescription = this.getDefinition();
    for (var attribute in oldDescription)
        if (attribute != '_id')
            this.set(attribute, undefined, { strict: false });
    Object.assign(this, description);
    return this.save();
};

schema.methods.getParameters = function () {
    const allVariables = this.variables.toObject();
    const parameters = allVariables.filter(variable => variable.type === 'parameter');
    return parameters;
}

// Create the model
const model = mongoose.model('Experiment', schema);

module.exports = model;