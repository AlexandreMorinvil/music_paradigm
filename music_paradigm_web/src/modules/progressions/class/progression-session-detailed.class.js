export class ProgressionSessionDetailed {
    constructor(progressionSessionsDetailed = {}) {
        const parameters = JSON.parse(JSON.stringify(progressionSessionsDetailed || {}));

        // Id of the pregression session
        this.associativeId = parameters.associativeId;
        this.associativeIdOrdinalNumber = parameters.associativeIdOrdinalNumber;

        // Task progression marker details
        this.hasExperimentMarker = parameters.hasExperimentMarker;
        this.experimentMarkerProgressRatio = parameters.experimentMarkerProgressRatio;

        // Curriculum details
        this.isInSequentialCurriculum = parameters.isInSequentialCurriculum;

        // Associated Curriculum session details
        this.title = parameters.title; 
        this.text = parameters.text; 
        this.delayInDays = parameters.delayInDays; 
        this.releaseTime = parameters.releaseTime; 
        this.isUniqueInDay = parameters.isUniqueInDay; 
        this.isCompletionLimited = parameters.isCompletionLimited; 

        // Progression session details
        this.startCount = parameters.startCount;
        this.initialStartDate = parameters.initialStartDate;
        this.startDates = parameters.startDates;
        this.completionCount = parameters.completionCount;
        this.advanceCompeletionDate = parameters.advanceCompeletionDate;
        this.completionDates = parameters.completionDates;

        // Progression session adjustments
        this.adjustmentDelayInDays = parameters.adjustmentDelayInDays;
        this.adjustmentConsiderCompleted = parameters.adjustmentConsiderCompleted;
        this.adjustmentAdditionalCompletionsRequired = parameters.adjustmentAdditionalCompletionsRequired;
        this.adjustmentPreponeAvailability = parameters.adjustmentPreponeAvailability;
        this.adjustmentOverlookUniqueInDays = parameters.adjustmentOverlookUniqueInDays;
        this.adjustmentImposeReadyToBeDone = parameters.adjustmentImposeReadyToBeDone;
        this.adjustmentBlockAvailability = parameters.adjustmentBlockAvailability;
        this.adjustmentRemoveCompletionLimit = parameters.adjustmentRemoveCompletionLimit;

        // Progression session availaility details
        this.delayPreAvailabilityInDays = parameters.delayPreAvailabilityInDays;
        this.delayPreAvailabilityInHours = parameters.delayPreAvailabilityInHours;
        this.isLockedByCompletionLimit = parameters.isLockedByCompletionLimit;
        this.wouldBeFree = parameters.wouldBeFree;

        // Progression session current availaility status
        this.isDelayedByPreviousSequential = parameters.isDelayedByPreviousSequential;
        this.isDelayedByPreviousUniqueInDay = parameters.isDelayedByPreviousUniqueInDay;
        this.isAvailable = parameters.isAvailable;
    }
}