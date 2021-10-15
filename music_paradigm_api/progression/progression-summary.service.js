const timeHandler = require('_helpers/timeHandler')

const progressionAssociation = require('./progression-association.service');
const Progression = require('database/db').Progression;
const User = require('database/db').User;

module.exports = {
    updateProgression,
    generateProgressionSummary,
};

async function updateProgression(userId) {
    const { curriculum, progression } = await User.getCurriculumAndProgressionData(userId);

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
    const { curriculum, progression } = await User.getCurriculumAndProgressionData(userId);

    // Generate progression to curriculum association
    const association = progressionAssociation.generateProgressionToCurriculumAssociation(curriculum, progression); 

    // Generate the progression summary
    let dueExperiment = null;
    const wasTodayCompleted = timeHandler.isToday(progression.lastProgressionDate);
    const timeElapsedInDays = (progression.isSequential) ? timeHandler.calculateDaysElapsed(progression.lastProgressionDate) : timeHandler.calculateDaysElapsed(progression.startTime);
    let hasBlockingIncompleteInSequence = false;
    let hasBlockingUniqueInDayDoneToday = false;
    const progressionSummary = [];

    for (i in curriculum.experiments) {
        // We retrieve the history of the experients completed
        const curriculumExperiment = association[i].curriculumExperiment;
        const progressionExperiment = association[i].progressionExperiment;
        const associativeId = association[i].associativeId;
        const associativeIdOrdinalNumber = association[i].associativeIdOrdinalNumber;

        // Attributes that are relative to the current experiment
        const elements = {};
        elements.associativeId = associativeId;
        elements.associativeIdOrdinalNumber = associativeIdOrdinalNumber;
        elements.title = curriculumExperiment.title;
        elements.text = curriculumExperiment.text;
        elements.releaseTime = curriculumExperiment.releaseTime;
        elements.isUniqueIndDay = curriculumExperiment.isUniqueIndDay;
        elements.isCompletionLimited = curriculumExperiment.isCompletionLimited;

        elements.completionCount = progressionExperiment.completionCount || 0;

        elements.delayPreAvailabilityInDays = getDelayInDaysLeft(curriculumExperiment.delayInDays, timeElapsedInDays);
        elements.delayPreAvailabilityInHours = getDelayInHoursLeft(elements.delayPreAvailabilityInDays, curriculumExperiment.releaseTime);
        elements.isLockedByCompletionLimit = getIsLockedByCompletionLimit(curriculumExperiment.isCompletionLimited, progressionExperiment.completionCount);
        elements.wouldBeFree = getWouldBeFreeStatus(elements.delayPreAvailabilityInDays, elements.delayPreAvailabilityInHours, elements.isLockedByCompletionLimit);

        // Attributes that are relative to the previous experiments of the chain
        elements.isDelayedByPreviousSequential = hasBlockingIncompleteInSequence;
        elements.isDelayedByPreviousUniqueInDay = hasBlockingUniqueInDayDoneToday;
        elements.isAvailable = getIsAvailableStatus(elements.wouldBeFree, hasBlockingIncompleteInSequence, hasBlockingUniqueInDayDoneToday);
        progressionSummary.push(elements);

        // Update the experiment due today
        if (elements.isAvailable &&
            !Boolean(elements.completionCount) &&
            !Boolean(dueExperiment && dueExperiment.associativeId)
        ) {
            dueExperiment = {};
            dueExperiment.associativeId = elements.associativeId;
            dueExperiment.associativeIdOrdinalNumber = elements.associativeIdOrdinalNumber;
        }

        // Update the blocking elements that propagate in the later elements
        hasBlockingIncompleteInSequence = updateHasBlockingIncompleteInSequence(
            hasBlockingIncompleteInSequence,
            progressionExperiment.completionCount
        );

        hasBlockingUniqueInDayDoneToday = updateHasBlockingUniqueInDayDoneToday(
            hasBlockingUniqueInDayDoneToday,
            curriculumExperiment.isUniqueIndDay,
            wasTodayCompleted
        );
    }
    return { history: progressionSummary, dueExperiment: dueExperiment };
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

function getDelayInDaysLeft(delayInDaysBeforeAvailability, timeElapsedInDays) {
    return Math.max(0, delayInDaysBeforeAvailability - timeElapsedInDays);
}

function getDelayInHoursLeft(delayPreAvailabilityInDays, releaseTimeInHours) {
    if (delayPreAvailabilityInDays === 0) return timeHandler.getHoursMinuteLeft(releaseTimeInHours);
    return releaseTimeInHours;
}

function getIsLockedByCompletionLimit(isCompletionLimited, completionsDone = 0) {
    if (isCompletionLimited) return completionsDone > 0;
    else return false;
}

function getWouldBeFreeStatus(delayInDays, delayInHours, isLockedByCompletionLimit) {
    if (delayInDays > 0) return false;
    else if (timeHandler.timeAsMinutes(delayInHours) > 0) return false;
    else if (isLockedByCompletionLimit) return false;
    else return true
}

function getIsAvailableStatus(wouldBeFree, hasBlockingIncompleteInSequence, hasBlockingUniqueInDayDoneToday) {
    return wouldBeFree && !hasBlockingIncompleteInSequence && !hasBlockingUniqueInDayDoneToday;
}

function updateHasBlockingIncompleteInSequence(hasBlockingInSequence, completionCount = 0) {
    if (hasBlockingInSequence) return true;
    else if (completionCount < 1) return true;
    else return false;
}

function updateHasBlockingUniqueInDayDoneToday(hasBlockingUniqueInDay, isExperimentUniqueInDay, wasTodayCompleted) {
    if (hasBlockingUniqueInDay) return true;
    else if (isExperimentUniqueInDay && wasTodayCompleted) return true;
    else return false;
}