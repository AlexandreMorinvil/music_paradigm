const schema = require('./user.schema');
const Progression = require('database/models/progression/progression.model');

const LogSimple = require('database/models/log-simple/log-simple.model');
const LogThorough = require('database/models/log-thorough/log-thorough.model');

// Remove the progressions associated upon deletion
schema.pre('remove', function (next) {
    Progression.remove({ userReference: this._id }).exec();
    LogThorough.remove({ userId: this._id }).exec();
    LogSimple.remove({ userId: this._id }).exec();
    next();
});

module.exports = schema;