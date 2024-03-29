const schema = require('./user.schema');

const ExperimentMarker = require('database/models/experiment-marker/experiment-marker.model');
const Progression = require('database/models/progression/progression.model');
const LogThorough = require('database/models/log-thorough/log-thorough.model').model;

// Remove the progressions associated upon deletion
schema.pre('remove', function (next) {
    ExperimentMarker.deleteMany({ progressionReference: { $in: this.progressions } }).exec();
    Progression.deleteMany({ userReference: this._id }).exec();
    LogThorough.deleteMany({ userId: this._id }).exec();
    next();
});

module.exports = schema;