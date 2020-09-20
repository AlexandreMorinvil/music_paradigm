const mongoose = require('mongoose');
schema = require('./curriculum.schema');

schema.set('toJSON', { virtuals: true });

// Creating the model
const model = mongoose.model('Curriculum', schema);

module.exports = model;