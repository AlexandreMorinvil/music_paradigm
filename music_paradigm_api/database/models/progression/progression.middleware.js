const schema = require('./progression.schema');
const LogSimple = require('database/models/log-simple/log-simple.model');
const LogThorough = require('database/models/log-thorough/log-thorough.model');

// Remove the logs associated to the progressions
schema.pre('remove', function (next) {

    // Delete the logs that possess the progression ID concerned
    LogSimple
        .remove({ progressionId: this._id })
        .exec();

    LogThorough
        .remove({ progressionId: this._id })
        .exec();

    next();
});

module.exports = schema;
