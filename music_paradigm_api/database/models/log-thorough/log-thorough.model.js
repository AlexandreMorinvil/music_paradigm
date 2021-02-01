const mongoose = require('mongoose');
schema = require('./log-thorough.schema');

schema.set('toJSON', { virtuals: true });

// Static methods
schema.statics.initializeLog = async function (logHeader) {
    const createdLog = new this(logHeader);
    return createdLog.save();
}

schema.statics.addLogBlock = async function (logId, block) {
    console.log('GOT IT');
    const log = await this.findById(logId);
    log.blocks.push(block);
    return log.save();
};

schema.statics.concludeLog = async function (logId, logConclusion) {
    const log = await this.findById(logId);
    log.endTimestamp = logConclusion.endTimestamp || Date.now();
    return log.save();
};

// Creating the model
const model = mongoose.model('Log-Thorough', schema);
const adminModel = mongoose.model('Admin-Log-Thorough', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}