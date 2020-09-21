const mongoose = require('mongoose');
schema = require('./progression.schema');

schema.set('toJSON', { virtuals: true });

// Creating the model
const model = mongoose.model('Progression', schema);

module.exports = model;