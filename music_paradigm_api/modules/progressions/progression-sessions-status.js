const timeHandler = require('_helpers/time-handler')
const ExperimentMarker = require('database/db').ExperimentMarker;
const Progression = require('database/db').Progression;

const ProgressionSessionDetailed = require('modules/progressions/class/progression-session-detailed.class');
const ProgressionSessionsStatus = require('modules/progressions/class/progression-session-status.class');

const {
    generateProgressionToCurriculumAssociation,
    indicateExperimentMakersInProgressionAssociation
} = require('./progression-curriculum-association');

module.exports = {
    generateProgressionSessionsStatusForProgression,
    generateProgressionSessionsStatusForProgressionId,
    generateProgressionSessionsStatusForUserId,
};

async function generateProgressionSessionsStatusForProgression(progression) {
    const curriculum = progression ? await progression.getCurriculum() : null;
    return generateProgressionSessionsStatus(curriculum, progression);
}

async function generateProgressionSessionsStatusForProgressionId(progressionId) {
    let { curriculum, progression } = await Progression.getProgressionAndCurriculumById(progressionId);
    return generateProgressionSessionsStatus(curriculum, progression);
}

async function generateProgressionSessionsStatusForUserId(userId) {
    let { curriculum, progression } = await Progression.getActiveProgressionAndCurriculumByUserId(userId);
    return generateProgressionSessionsStatus(curriculum, progression);
}

async function generateProgressionSessionsStatus(curriculum, progression) {
    let taskStateMarkersList = [];

    // Verify parameters
    if (!curriculum) return new ProgressionSessionsStatus();
    if (!progression) progression = {};

    // Retrieve experiment markers
    else taskStateMarkersList = await ExperimentMarker.findMarkers(progression._id);

    // Generate progression to curriculum association
    let association = generateProgressionToCurriculumAssociation(curriculum, progression);
    association = indicateExperimentMakersInProgressionAssociation(association, taskStateMarkersList);

    // Generate the progression summary
    let dueExperiment = null;
    const wasTodayCompleted = timeHandler.isToday(progression.lastProgressionDate);

    const timeElapsedInDays = (curriculum.isSequential) ?
        timeHandler.calculateDaysElapsed(progression.lastProgressionDate) :
        adjustStartTime(timeHandler.calculateDaysElapsed(progression.startTime), progression.adjustmentStartTimeInDays);


    let hasBlockingIncompleteInSequence = false;
    let hasBlockingUniqueInDayDoneToday = false;
    const progressionSessionsDetailedList = [];

    for (let i in curriculum.experiments) {
        // We retrieve the history of the experients completed
        const {
            curriculumExperiment,
            progressionExperiment,
            associativeId,
            associativeIdOrdinalNumber,
            hasExperimentMarker,
            experimentMarkerProgressRatio,
        } = association[i];

        // Attributes that are relative to the current experiment
        const progressionSessionDetailed = {};
        progressionSessionDetailed.associativeId = associativeId;
        progressionSessionDetailed.associativeIdOrdinalNumber = associativeIdOrdinalNumber;

        progressionSessionDetailed.hasExperimentMarker = hasExperimentMarker;
        progressionSessionDetailed.experimentMarkerProgressRatio = experimentMarkerProgressRatio;

        progressionSessionDetailed.isInSequentialCurriculum = curriculum.isSequential;

        progressionSessionDetailed.title = curriculumExperiment.title;
        progressionSessionDetailed.text = curriculumExperiment.text;
        progressionSessionDetailed.delayInDays = curriculumExperiment.delayInDays;
        progressionSessionDetailed.releaseTime = curriculumExperiment.releaseTime;
        progressionSessionDetailed.isUniqueInDay = curriculumExperiment.isUniqueInDay;
        progressionSessionDetailed.isCompletionLimited = curriculumExperiment.isCompletionLimited;

        progressionSessionDetailed.startCount = progressionExperiment.startCount || 0;
        progressionSessionDetailed.initialStartDate = progressionExperiment.initialStartDate || null;
        progressionSessionDetailed.startDates = progressionExperiment.startDates || [];
        progressionSessionDetailed.completionCount = progressionExperiment.completionCount || 0;
        progressionSessionDetailed.advanceCompeletionDate = progressionExperiment.advanceCompeletionDate || null;
        progressionSessionDetailed.completionDates = progressionExperiment.completionDates || [];

        progressionSessionDetailed.adjustmentDelayInDays = progressionExperiment.adjustmentDelayInDays || 0;
        progressionSessionDetailed.adjustmentConsiderCompleted = progressionExperiment.adjustmentConsiderCompleted || false;
        progressionSessionDetailed.adjustmentAdditionalCompletionsRequired = progressionExperiment.adjustmentAdditionalCompletionsRequired || 0;
        progressionSessionDetailed.adjustmentPreponeAvailability = progressionExperiment.adjustmentPreponeAvailability || false;
        progressionSessionDetailed.adjustmentOverlookUniqueInDays = progressionExperiment.adjustmentOverlookUniqueInDays || false;
        progressionSessionDetailed.adjustmentImposeReadyToBeDone = progressionExperiment.adjustmentImposeReadyToBeDone || false;
        progressionSessionDetailed.adjustmentBlockAvailability = progressionExperiment.adjustmentBlockAvailability || false;
        progressionSessionDetailed.adjustmentRemoveCompletionLimit = progressionExperiment.adjustmentRemoveCompletionLimit || false;

        // Consider adjustments
        const adjustedDelayInDays = adjustDelayInDays(
            curriculumExperiment.delayInDays,
            progressionSessionDetailed.adjustmentDelayInDays
        );
        const adjustedCompletionCount = adjustCompletionCount(
            progressionSessionDetailed.completionCount,
            progressionSessionDetailed.adjustmentAdditionalCompletionsRequired,
            progressionSessionDetailed.adjustmentConsiderCompleted
        );
        const mustPreponeAvailability = adjustMustPreponeAvailability(
            progressionSessionDetailed.adjustmentPreponeAvailability,
            progressionSessionDetailed.adjustmentImposeReadyToBeDone
        );
        const mustIgnoreBlockingUniqueInDay = adjustMustIgnoreBlockingUniqueInDay(
            progressionSessionDetailed.adjustmentOverlookUniqueInDays
        );
        const mustIgnoreBlockingSequence = adjustMustIgnoreBlockingSequence(
            progressionSessionDetailed.adjustmentImposeReadyToBeDone
        );
        const mustBeBlocked = adjustMustBlockAvailability(
            progressionSessionDetailed.adjustmentBlockAvailability
        );
        const mustRemoveCompletionLimits = adjustMustRemoveCompletionLimit(
            progressionSessionDetailed.adjustmentRemoveCompletionLimit
        );

        // Computer the status of the experiment in the progression
        progressionSessionDetailed.delayPreAvailabilityInDays = getDelayInDaysLeft(
            adjustedDelayInDays,
            timeElapsedInDays
        );
        progressionSessionDetailed.delayPreAvailabilityInHours = getDelayInHoursLeft(
            progressionSessionDetailed.delayPreAvailabilityInDays,
            curriculumExperiment.releaseTime
        );
        progressionSessionDetailed.isLockedByCompletionLimit = getIsLockedByCompletionLimit(
            curriculumExperiment.isCompletionLimited,
            adjustedCompletionCount,
            mustRemoveCompletionLimits
        );
        progressionSessionDetailed.wouldBeFree = getWouldBeFreeStatus(
            progressionSessionDetailed.delayPreAvailabilityInDays,
            progressionSessionDetailed.delayPreAvailabilityInHours,
            progressionSessionDetailed.isLockedByCompletionLimit,
            mustPreponeAvailability
        );

        // Attributes that are relative to the previous experiments of the chain
        progressionSessionDetailed.isDelayedByPreviousSequential = hasBlockingIncompleteInSequence;
        progressionSessionDetailed.isDelayedByPreviousUniqueInDay = hasBlockingUniqueInDayDoneToday;
        progressionSessionDetailed.isAvailable = getIsAvailableStatus(
            progressionSessionDetailed.wouldBeFree,
            progressionSessionDetailed.isDelayedByPreviousSequential,
            progressionSessionDetailed.isDelayedByPreviousUniqueInDay,
            mustIgnoreBlockingSequence,
            mustBeBlocked,
        );

        // Add element to the history
        progressionSessionsDetailedList.push(new ProgressionSessionDetailed(progressionSessionDetailed));

        // Update the experiment due today
        dueExperiment = updateDueExperiment(
            dueExperiment,
            progressionSessionDetailed.isAvailable,
            adjustedCompletionCount,
            progressionSessionDetailed.associativeId,
            progressionSessionDetailed.associativeIdOrdinalNumber
        );

        // Update the blocking session that propagate in the later sessions
        hasBlockingIncompleteInSequence = updateHasBlockingIncompleteInSequence(
            hasBlockingIncompleteInSequence,
            adjustedCompletionCount
        );

        hasBlockingUniqueInDayDoneToday = updateHasBlockingUniqueInDayDoneToday(
            hasBlockingUniqueInDayDoneToday,
            !mustIgnoreBlockingUniqueInDay && curriculumExperiment.isUniqueInDay,
            wasTodayCompleted
        );
    }
    return new ProgressionSessionsStatus({ progressionSessionsDetailedList, taskStateMarkersList, dueExperiment: dueExperiment });
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

function adjustMustBlockAvailability(adjustmentBlockAvailability = false) {
    return Boolean(adjustmentBlockAvailability);
}

function adjustMustRemoveCompletionLimit(adjustmentRemoveCompletionLimit = false) {
    return Boolean(adjustmentRemoveCompletionLimit);
}

function getDelayInDaysLeft(delayInDaysBeforeAvailability, timeElapsedInDays) {
    return Math.max(0, delayInDaysBeforeAvailability - timeElapsedInDays);
}

function getDelayInHoursLeft(delayPreAvailabilityInDays, releaseTimeInHours) {
    if (delayPreAvailabilityInDays === 0) return timeHandler.getHoursMinuteLeft(releaseTimeInHours);
    return releaseTimeInHours;
}

function getIsLockedByCompletionLimit(isCompletionLimited, completionsDone = 0, mustRemoveCompletionLimits = false) {
    if (mustRemoveCompletionLimits) return false;
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

function getIsAvailableStatus(wouldBeFree, hasBlockingIncompleteInSequence, hasBlockingUniqueInDayDoneToday, mustIgnoreBlockingSequence = false, mustBeBlocked = false) {
    if (mustBeBlocked) return false;
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
