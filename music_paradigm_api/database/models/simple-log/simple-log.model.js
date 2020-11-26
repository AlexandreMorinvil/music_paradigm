const mongoose = require('mongoose');
schema = require('./simple-log.schema');

schema.set('toJSON', { virtuals: true });

// Instance methods
schema.methods.create = async function () {
    return this.save();
}

// Creating the model
const model = mongoose.model('Simple-Log', schema);
const adminModel = mongoose.model('Admin-Simple-Log', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}