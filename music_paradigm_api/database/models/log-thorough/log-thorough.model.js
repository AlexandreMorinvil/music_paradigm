const mongoose = require('mongoose');
schema = require('./log-thorough.schema');

schema.set('toJSON', { virtuals: true });

// Static methods
schema.statics.initializeLog = async function (logHeader) {
    const createdLog = new this(logHeader);
    return createdLog.save();
}

// Instance methods
schema.methods.addLogBlock = async function (block) {
    this.block.push(block);
    return this.save();
};

// Creating the model
const model = mongoose.model('Log-Thorough', schema);
const adminModel = mongoose.model('Admin-Log-Thorough', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}