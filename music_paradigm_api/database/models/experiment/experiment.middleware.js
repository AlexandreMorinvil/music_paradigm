const schema = require('./experiment.schema');
const Curriculum = require('database/models/curriculum/curriculum.model');

schema.pre('remove', function (next) {
    
    // Remove the experiment from all curriculums upon deletion
    Curriculum.updateMany(
        {},
        { $pull: { experiments: { experimentReference: this._id } } },
        { multi: true })
        .exec();
    next();
});

module.exports = schema;

