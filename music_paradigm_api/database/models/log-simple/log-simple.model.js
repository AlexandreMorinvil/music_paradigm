const mongoose = require('mongoose');
schema = require('./log-simple.schema');

schema.set('toJSON', { virtuals: true });

// Static methods
schema.statics.addBlock = async function (block) {
    const createdBlock = new this(block);
    return createdBlock.save();
}

schema.statics.makeSummaryList = async function (query) {
    return this.find(query, '-blocks');
}

// Creating the model
const model = mongoose.model('Log-Simple', schema);
const adminModel = mongoose.model('Admin-Log-Simple', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}