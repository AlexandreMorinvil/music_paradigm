const mongoose = require('mongoose');
schema = require('./log-thorough.schema');

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
const model = mongoose.model('Log-Thorough', schema);
const adminModel = mongoose.model('Admin-Log-Thorough', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}