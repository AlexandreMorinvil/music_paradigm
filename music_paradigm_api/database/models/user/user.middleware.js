const schema = require('./user.schema');

const Progression = require('database/models/progression/progression.model');
const LogSimple = require('database/models/log-simple/log-simple.model').model;
const LogThorough = require('database/models/log-thorough/log-thorough.model').model;

// Remove the progressions associated upon deletion
schema.pre('remove', function (next) {
    Progression.deleteMany({ userReference: this._id }).exec();
    LogThorough.deleteMany({ userId: this._id }).exec();
    LogSimple.deleteMany({ userId: this._id }).exec();
    next();
});

module.exports = schema;