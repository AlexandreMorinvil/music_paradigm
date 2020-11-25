const mongoose = require('mongoose');
schema = require('./session.schema');

schema.set('toJSON', { virtuals: true });

// Creating the model
const model = mongoose.model('Session', schema);
const adminModel = mongoose.model('AdminSession', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}