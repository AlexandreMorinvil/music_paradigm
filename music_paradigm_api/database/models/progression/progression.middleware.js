const schema = require('./progression.schema');
const ExperimentMarker = require('./experiment-marker/experiment-marker.model');
const User = require('database/models/user/user.model');
const LogSimple = require('database/models/log-simple/log-simple.model').model;
const LogThorough = require('database/models/log-thorough/log-thorough.model').model;

// Remove the logs associated to the progressions
schema.pre('remove', function (next) {

    // Delete any experiment marker related to this progression
    ExperimentMarker
        .deleteMany({ progressionReference: this._id })
        .exec();

    // Remove the progression from the user concerned upon deletion
    User
        .updateMany(
            { _id: this.userReference },
            { $pull: { progressions: this._id } })
        .exec();

    // Delete the logs that possess the progression ID concerned
    LogSimple
        .deleteMany({ progressionId: this._id })
        .exec();

    LogThorough
        .deleteMany({ progressionId: this._id })
        .exec();

    next();
});

module.exports = schema;
