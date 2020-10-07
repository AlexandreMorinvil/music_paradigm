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
    // This conversion table is particularily useful to handle the situations where the curriculum would be modified 
    // while a user's prgression was already well advanced. This way, it is possible to retreive the completed part 
    // of the curriculum from the progression, even though the two might not correspond 1 to 1 anymore.
    const association = []
    for (let i = 0; i < curriculum.experiments.length; i++) {
        for (let j = 0; j < progression.experiments.length; j++) {
            if (curriculum.experiments[i].associativeId === progression.experiments[j].associativeId) {
                association.push({
                    curriculum: curriculum.experiments[i],
                    progression: progression.experiments[j]
                });
                break;
            }
        }
    }

    // Generate the progression summary
    let dueExperiment = null;
    const wasTodayCompleted = timeHandler.isToday(curriculum.lastProgressionDate);
    const timeElapsed = timeHandler.calculateDaysElapsed(progression.startTime);
    let hasBlockingIncompleteInSequence = false;
    let hasBlockingUniqueInDayDoneToday = false;
    const progressionSummary = [];

    for (i in curriculum.experiments) {
        curriculumExperiment = (association.length > i) ? association[i].curriculum : curriculum.experiments[i];
        progressionExperiment = (association.length > i) ? association[i].progression : {};

        const element = {};
        element.associativeId = curriculumExperiment.associativeId;
        element.title = curriculumExperiment.title;
        element.delayPreAvailability = getDelayInDaysLeft(curriculumExperiment.delayInDays, timeElapsed);
        element.completionsRequiredLeft = getCompletionsRequiredLeft(curriculumExperiment.completionTarget, progressionExperiment.completionCount);
        element.completionsLimitLeft = getCompletionsLimitLeft(curriculumExperiment.completionLimit, progressionExperiment.completionCount);

        const wouldBeFree = getWouldBeFreeStatus(element.delayPreAvailability, element.completionsLimitLeft);

        element.isDelayedByPreviousSequential = hasBlockingIncompleteInSequence;
        element.isDelayedByPreviousUniqueInDay = hasBlockingUniqueInDayDoneToday;
        progressionSummary.push(element);

        const isAvailable = (wouldBeFree && !hasBlockingIncompleteInSequence && !hasBlockingUniqueInDayDoneToday);
        if(!wasTodayCompleted && isAvailable) dueExperiment = curriculumExperiment.associativeId;
        
        hasBlockingIncompleteInSequence = updateHasBlockingIncompleteInSequence(wouldBeFree, hasBlockingIncompleteInSequence,
            curriculum.isSequential, element.completionsRequiredLeft);
        hasBlockingUniqueInDayDoneToday = updateHasBlockingUniqueInDayDoneToday(wouldBeFree, hasBlockingUniqueInDayDoneToday,
            curriculumExperiment.isUniqueIndDay, curriculum.lastProgressionDate);
    }
    return { history : progressionSummary, dueExperiment: dueExperiment};
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

function getWouldBeFreeStatus(delay, completionLimitLeft) {
    if (delay > 0) return false;
    else if (completionLimitLeft === 0 && completionsLimitLeft !== -1) return false;
    else return true
}

function updateHasBlockingIncompleteInSequence(isCurrentFree, hasBlockingInSequence, isCurriculumSequential, completionsRequiredLeft) {
    if (hasBlockingInSequence) return true;
    else if (completionsRequiredLeft > 0) return true;
    else if (isCurriculumSequential && !isCurrentFree) return true;
    else return false;
}

function updateHasBlockingUniqueInDayDoneToday(isCurrentFree, hasBlockingUniqueInDay, isExperimentUniqueInDay, lastProgressionDate) {
    if (hasBlockingUniqueInDay) return true;
    else if (isExperimentUniqueInDay && !isCurrentFree) return true;
    else if (isExperimentUniqueInDay && timeHandler.isToday(lastProgressionDate)) return true;
    else return false;
}