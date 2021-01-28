schema = require('./progression.schema');

schema.pre('remove', function (nextAction) {
    const LogSimple = require('database/models/log-simple/log-simple.model');
    const LogThorough = require('database/models/log-thorough/log-thorough.model');

    let progression = this;

    // Delete the progression for the user concerned
    progression.model('User').update({
        _id: { $in: progression.userReference }
    }, {
        $pull: { progressions: progression._id }
    },
        next
    );

    // Delete all the nested recoded experiment completions
    Async.each(progression.experiments, function (progressionExperiment, next) {

        console.log("Just a test");

        // Retreive the logs
        const logReference = progressionExperiment.logReference;
        if (!logReference) return;

        // Delete all the logs related to the deleted progression
        logReference.forEach(logId => {
            LogSimple.remove({ _id: logId }).exec();
            LogThorough.remove({ _id: logId }).exec();
        });

    }, function () {
        nextAction();
    })
});