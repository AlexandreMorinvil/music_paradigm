const schema = require('./curriculum.schema');
const User = require('database/models/user/user.model');

schema.pre('remove', function (next) {

    // Remove the curriculm from all users upon deletion
    User.updateMany(
        { curriculum: this._id },
        { $set: { curriculum: null } },
        { multi: true })
        .exec();
    next();
});

module.exports = schema;

