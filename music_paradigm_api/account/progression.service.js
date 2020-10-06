const jwt = require('jwt/jwt');
const timeHandler = require('_helpers/timeHandler')
const db = require('database/db');
const { MaxKey } = require('mongodb');
const Progression = db.Progression;
const Experiment = db.Experiment;
const Curriculum = db.Curriculum;
const User = db.User;

module.exports = {
    updateProgression,
    generateProgressionSummary,
};

async function updateProgression(userId) {
    const { curriculum, progression } = await User.getProgressionData(userId);

    // Do not generate a progression if no curriculum is associated to the user
    if (!curriculum) return;

    // Generate a progression if there is a curriculum but no progression registered
    if (!progression) return await generateProgression(userId);

    // Generate a progression if the last registered progression is not for the current curriculum
    const curriculumId = curriculum._id.toString();
    const curriculumIdLastProgression = progression.curriculumReference.toString();
    if (curriculumId !== curriculumIdLastProgression) return await generateProgression(userId)
}

async function generateProgressionSummary(userId) {
    const { curriculum, progression } = await User.getProgressionData(userId);

    // Generate progression to curriculum association
    // This conversion table is necessary to handle the situations where the curriculum
    // would be modified while a user's prgression was already well advanced. This way, it
    // is possible to retreive the completed part of the curriculum from the progression,
    // even though the two might not correspond 1 to 1 anymore.
    const association = []
    for (let i = 0; i < curriculum.experiments.length && i < progression.experiments.length; i++) {
        let hasAssociationMissing = true;
        for (let j = i; j < progression.experiments.length; j++) {
            if (curriculum.experiments[i]._id === progression.experiments[j]._id) {
                association.push({
                    curriculum: curriculum.experiments[i],
                    progression: progression.experiments[j]
                });
                hasAssociationMissing = false
                break;
            }
        }
        if (hasAssociationMissing) break;
    }

    // Generate the progression summary
    const timeElapsed = timeHandler.calculateDaysElapsed(progression.startTime);
    const hasBlockingIncompleteInSequence = false;
    const hasBlockingUniqueInDayDoneToday = false;
    const progressionSummary = [];

    for (i in curriculum.experiments) {
        curriculumExperiment = (association.length >= i) ? association[i].curriculum : curriculum.experiments[i];
        progressionExperiment = (association.length >= i) ? association[i].progression : {};
        const element = {
            title: experiment.experiments[index].title,
            delayPreAvailability: getDelayInDaysLeft(curriculumExperiment.delayInDays, timeElapsed),
            completionsRequiredLeft: getCompletionsRequiredLeft(curriculumExperiment.completionTarget, progressionExperiment.completionCount),
            completionsLimitLeft: getCompletionsLimitLeft(curriculumExperiment.completionLimit, progressionExperiment.completionCount),
            isPreviousSequentialDelayed: false, //TODO: I am here
            isPreviousUniqueInDayDelayed: false,
        }
        progressionSummary.push(element);
    }

    console.log(curriculum);
    console.log(progression);
    console.log("print here");
}

async function generateProgression(userId) {
    const user = await User.findById(userId);
    const progression = new Progression({
        userReference: user._id,
        curriculumReference: user.curriculum
    });
    user.progressions.push(progression);
    progression.save();
    user.save();
}


function getDelayInDaysLeft(delayBeforeAvailability, timeElapsed) {
    return Math.max(0, delayBeforeAvailability - timeElapsed);
}

function getCompletionsRequiredLeft(completionsRequired, completionsDone = 0) {
    return Math.max(0, completionsRequired - completionsDone);
}

function getCompletionsLimitLeft(completionLimit, completionsDone = 0) {
    if (completionLimit === 0) return -1;
    else return Math.max(0, completionLimit - completionsDone);
}
