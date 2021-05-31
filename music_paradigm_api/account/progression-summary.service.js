const timeHandler = require('_helpers/timeHandler')
const db = require('database/db');
const Progression = db.Progression;
const User = db.User;

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
    // This conversion table is particularily useful to handle the situations where the curriculum would be modified 
    // while a user's prgression was already well advanced. This way, it is possible to retreive the completed part 
    // of the curriculum from the progression, even though the two might not correspond 1 to 1 anymore.
    encounteredAssociativeId = {};
    const association = []
    for (let i = 0; i < curriculum.experiments.length; i++) {

        // Initialize the counter for the numnber of time the associative ID is encountered (to avoid having 2 experiments 
        // considered as exactly the same) if they have the same associative ID
        let encountersCount = 0;
        const associativeId = curriculum.experiments[i].associativeId;
        if (typeof encounteredAssociativeId[associativeId] !== 'number') encounteredAssociativeId[associativeId] = 0;

        // Initialize an association
        association.push({
            associativeId: associativeId,
            curriculumExperiment: curriculum.experiments[i],
        });

        // If the association is not fount in the progression, we will associate an empty dummy progression experiment
        let progressionExperiment = {};

        // Perform the association between the expriments in the curriculum and the experiments done
        for (let j = 0; j < progression.experiments.length; j++) {
            if (curriculum.experiments[i].associativeId === progression.experiments[j].associativeId) {

                // Everytime the associative Id is encountered, we increment the encounter count
                if (encountersCount < encounteredAssociativeId[associativeId]) encountersCount += 1;

                // If the associativeId and the associativeIdOrdinalNumber correspond, we will add this progression 
                // experiment to the associtaiton and we memory the ordinal number of this associativeId
                else {
                    progressionExperiment = progression.experiments[j]
                    break;
                }
            }
        }

        // Associate the progression experiment
        Object.assign(association[i], {
            associativeIdOrdinalNumber: encounteredAssociativeId[associativeId],
            progressionExperiment: progressionExperiment
        });
        encounteredAssociativeId[associativeId] += 1;
        
    }

    // Generate the progression summary
    let dueExperimentAssociativeId = null;
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
        if (elements.isAvailable && !Boolean(elements.completionCount) && !Boolean(dueExperimentAssociativeId))  {
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