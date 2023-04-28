const schema = require('./progression.schema');

// Remove the logs associated to the progressions
schema.pre('remove', function (next) {
    
    // Delete any experiment marker related to this progression
    const ExperimentMarker = require('database/models/experiment-marker/experiment-marker.model');
    ExperimentMarker
    .deleteMany({ progressionReference: this._id })
        .exec();

    // Remove the progression from the user concerned upon deletion
    const User = require('database/models/user/user.model');
    User
    .updateMany(
        { _id: this.userReference },
        { $pull: { progressions: this._id } })
        .exec();
        
    // Delete the logs that possess the progression ID concerned
    const LogThorough = require('database/models/log-thorough/log-thorough.model').model;
    LogThorough
        .deleteMany({ progressionId: this._id })
        .exec();

    next();
});

module.exports = schema;
