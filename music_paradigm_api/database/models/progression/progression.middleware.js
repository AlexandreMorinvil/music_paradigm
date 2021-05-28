const schema = require('./progression.schema');
const LogSimple = require('database/models/log-simple/log-simple.model');
const LogThorough = require('database/models/log-thorough/log-thorough.model');

// Remove the logs associated to the progressions
schema.pre('remove', async function (next) {

    LogSimple
        .find({ progressionId: this._id })
        .remove()
        .exec();

    LogThorough
        .find({ progressionId: this._id })
        .remove()
        .exec();

    // simpleLogReferences: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'Log-Simple',
    //     default: []
    // },

    // thoroughLogReferences: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'Log-Thorough',
    //     default: []
    // },






    // LogSimple.remove({ userReference: this._id }).exec();



    LogSimple.remove({ userReference: this._id }).exec();




    next();
});

module.exports = schema;

// const schema = require('./progression.schema');
// const Curriculum = require('database/models/curriculum/curriculum.model');

// // Remove the experiment from all curriculums upon deletion
// schema.pre('remove', function (next) {
//     Curriculum.update(
//         {},
//         { $pull: { experiments: { experimentReference: this._id } } },
//         { multi: true })
//         .exec();
//     next();
// });

// module.exports = schema;

// schema = require('./progression.schema');

// schema.pre('remove', function (nextAction) {
//     const LogSimple = require('database/models/log-simple/log-simple.model');
//     const LogThorough = require('database/models/log-thorough/log-thorough.model');

//     let progression = this;

//     // Delete the progression for the user concerned
//     progression.model('User').update({
//         _id: { $in: progression.userReference }
//     }, {
//         $pull: { progressions: progression._id }
//     },
//         next
//     );

//     // Delete all the nested recoded experiment completions
//     Async.each(progression.experiments, function (progressionExperiment, next) {

//         console.log("Just a test");

//         // Retreive the logs
//         const logReference = progressionExperiment.logReference;
//         if (!logReference) return;

//         // Delete all the logs related to the deleted progression
//         logReference.forEach(logId => {
//             LogSimple.remove({ _id: logId }).exec();
//             LogThorough.remove({ _id: logId }).exec();
//         });

//     }, function () {
//         nextAction();
//     })
// });