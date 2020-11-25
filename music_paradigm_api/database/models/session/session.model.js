const mongoose = require('mongoose');
schema = require('./session.schema');

schema.set('toJSON', { virtuals: true });

// Instance methods
schema.methods.create = async function () {
    // if (!this.email) this.userId = undefined;
    // if (!this.experimentName) this.username = undefined;
    // if (!this.experimentName) this.experimentName = undefined;
    // if (!this.timestamp) this.timestamp = Date.now;
    return this.save();
}

schema.methods.addBlock = async function (block) {
    this.states.push(block);
    return this.save();
};

// Creating the model
const model = mongoose.model('Session', schema);
const adminModel = mongoose.model('AdminSession', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}