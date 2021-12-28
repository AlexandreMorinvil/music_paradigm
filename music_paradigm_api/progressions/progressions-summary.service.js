const timeHandler = require('_helpers/timeHandler')
const progressionAssociation = require('./progressions-association.service');
const User = require('database/db').User;

module.exports = {
    generateProgressionSummary,
};

async function generateProgressionSummary(userId) {
    let { curriculum, progression } = await User.getCurriculumAndProgressionObject(userId);

    // Verify parameters
    if (!curriculum) return { history: [], dueExperiment: null };
    if (!progression) progression = {};

    // Generate progression to curriculum association
    const association = progressionAssociation.generateProgressionToCurriculumAssociation(curriculum, progression);

    // Generate the progression summary
    let dueExperiment = null;
    const wasTodayCompleted = timeHandler.isToday(progression.lastProgressionDate);

    const timeElapsedInDays = (progression.isSequential) ?
        timeHandler.calculateDaysElapsed(progression.lastProgressionDate) :
        adjustStartTime(timeHandler.calculateDaysElapsed(progression.startTime), progression.adjustmentStartTimeInDays);


    let hasBlockingIncompleteInSequence = false;
    let hasBlockingUniqueInDayDoneToday = false;
    const progressionHistory = [];

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

        elements.startCount = progressionExperiment.startCount || 0;
        elements.initialStartDate = progressionExperiment.initialStartDate || null;
        elements.completionCount = progressionExperiment.completionCount || 0;
        elements.advanceCompeletionDate = progressionExperiment.advanceCompeletionDate || null;

        elements.adjustmentDelayInDays = progressionExperiment.adjustmentDelayInDays || 0;
        elements.adjustmentConsiderCompleted = progressionExperiment.adjustmentConsiderCompleted || false;
        elements.adjustmentAdditionalCompletionsRequired = progressionExperiment.adjustmentAdditionalCompletionsRequired || 0;
        elements.adjustmentPreponeAvailability = progressionExperiment.adjustmentPreponeAvailability || false;
        elements.adjustmentOverlookUniqueInDays = progressionExperiment.adjustmentOverlookUniqueInDays || false;
        elements.adjustmentImposeReadyToBeDone = progressionExperiment.adjustmentImposeReadyToBeDone || false;

        // Consider adjustments
        const adjustedDelayInDays = adjustDelayInDays(curriculumExperiment.delayInDays, elements.adjustmentDelayInDays);
        const adjustedCompletionCount = adjustCompletionCount(elements.completionCount, elements.adjustmentAdditionalCompletionsRequired, elements.adjustmentConsiderCompleted);
        const mustPreponeAvailability = adjustMustPreponeAvailability(elements.adjustmentPreponeAvailability, elements.adjustmentImposeReadyToBeDone);
        const mustIgnoreBlockingUniqueInDay = adjustMustIgnoreBlockingUniqueInDay(elements.adjustmentOverlookUniqueInDays);
        const mustIgnoreBlockingSequence = adjustMustIgnoreBlockingSequence(elements.adjustmentImposeReadyToBeDone);

        // Computer the status of the experiment in the progression
        elements.delayPreAvailabilityInDays = getDelayInDaysLeft(adjustedDelayInDays, timeElapsedInDays);
        elements.delayPreAvailabilityInHours = getDelayInHoursLeft(elements.delayPreAvailabilityInDays, curriculumExperiment.releaseTime);
        elements.isLockedByCompletionLimit = getIsLockedByCompletionLimit(curriculumExperiment.isCompletionLimited, adjustedCompletionCount);
        elements.wouldBeFree = getWouldBeFreeStatus(elements.delayPreAvailabilityInDays, elements.delayPreAvailabilityInHours, elements.isLockedByCompletionLimit, mustPreponeAvailability);

        // Attributes that are relative to the previous experiments of the chain
        elements.isDelayedByPreviousSequential = hasBlockingIncompleteInSequence;
        elements.isDelayedByPreviousUniqueInDay = !mustIgnoreBlockingUniqueInDay && hasBlockingUniqueInDayDoneToday;
        elements.isAvailable = getIsAvailableStatus(
            elements.wouldBeFree, 
            elements.isDelayedByPreviousSequential, 
            elements.isDelayedByPreviousUniqueInDay, 
            mustIgnoreBlockingSequence
        );
        
        // Add element to the history
        progressionHistory.push(elements);

        // Update the experiment due today
        dueExperiment = updateDueExperiment(dueExperiment, elements.isAvailable, adjustedCompletionCount, elements.associativeId, elements.associativeIdOrdinalNumber);

        // Update the blocking elements that propagate in the later elements
        hasBlockingIncompleteInSequence = updateHasBlockingIncompleteInSequence(
            hasBlockingIncompleteInSequence,
            adjustedCompletionCount
        );

        hasBlockingUniqueInDayDoneToday = updateHasBlockingUniqueInDayDoneToday(
            hasBlockingUniqueInDayDoneToday,
            curriculumExperiment.isUniqueIndDay,
            wasTodayCompleted
        );
    }
    return { history: progressionHistory, dueExperiment: dueExperiment };
}

function adjustStartTime(daysElapsed, adjustmentInDays = 0) {
    return daysElapsed + adjustmentInDays;
}

function adjustDelayInDays(delayInDays, adjustment = 0) {
    return delayInDays + adjustment;
}

function adjustCompletionCount(completionCount, adjustmentAdditionalCompletionsRequired = 0, adjustmentConsiderCompleted = false) {
    return adjustmentConsiderCompleted ? 1 : Math.max(0, completionCount - adjustmentAdditionalCompletionsRequired);
}

function adjustMustPreponeAvailability(adjustmentPreponeAvailability = false, adjustmentImposeReadyToBeDone = false) {
    return Boolean(adjustmentPreponeAvailability) || Boolean(adjustmentImposeReadyToBeDone);
}

function adjustMustIgnoreBlockingUniqueInDay(adjustmentOverlookUniqueInDays = false) {
    return Boolean(adjustmentOverlookUniqueInDays);
}

function adjustMustIgnoreBlockingSequence(adjustmentImposeReadyToBeDone = false) {
    return Boolean(adjustmentImposeReadyToBeDone);
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

function getWouldBeFreeStatus(delayInDays, delayInHours, isLockedByCompletionLimit, mustPreponeAvailability) {
    if (isLockedByCompletionLimit) return false;
    if (mustPreponeAvailability) return true;
    else if (delayInDays > 0) return false;
    else if (timeHandler.timeAsMinutes(delayInHours) > 0) return false;
    else return true
}

function getIsAvailableStatus(wouldBeFree, hasBlockingIncompleteInSequence, hasBlockingUniqueInDayDoneToday, mustIgnoreBlockingSequence = false) {
    if (mustIgnoreBlockingSequence && wouldBeFree) return true;
    else return !hasBlockingIncompleteInSequence && !hasBlockingUniqueInDayDoneToday && wouldBeFree;
}

function updateDueExperiment(currentDueExperiment, candidateIsAvailable, candidateCompletionCount, candidateAssociativeId, candidateAssociativeIdOrdinalNumber) {
    if (!Boolean(currentDueExperiment && currentDueExperiment.associativeId) && // If there are no due experiment yet
        candidateIsAvailable &&                                                 // If the candidate experiment is available
        !Boolean(candidateCompletionCount)                                      // If the candidate experiment is not considered completed
    ) {
        currentDueExperiment = {
            associativeId: candidateAssociativeId,
            associativeIdOrdinalNumber: candidateAssociativeIdOrdinalNumber,
        };
    }
    return currentDueExperiment;
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
