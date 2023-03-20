export class ProgressionSessionDetailed {
    constructor(progressionSessionsDetailed = {}) {
        const parameters = JSON.parse(JSON.stringify(progressionSessionsDetailed || {}));

        // Id of the pregression session
        this.associativeId = parameters.associativeId ?? null;
        this.associativeIdOrdinalNumber = parameters.associativeIdOrdinalNumber ?? null;

        // Task progression marker details
        this.hasExperimentMarker = parameters.hasExperimentMarker ?? null;
        this.experimentMarkerProgressRatio = parameters.experimentMarkerProgressRatio ?? null;

        // Curriculum details
        this.isInSequentialCurriculum = parameters.isInSequentialCurriculum ?? null;

        // Associated Curriculum session details
        this.title = parameters.title ?? null; 
        this.text = parameters.text ?? null; 
        this.delayInDays = parameters.delayInDays ?? null; 
        this.releaseTime = parameters.releaseTime ?? null; 
        this.isUniqueInDay = parameters.isUniqueInDay ?? null; 
        this.isCompletionLimited = parameters.isCompletionLimited ?? null; 

        // Progression session details
        this.startCount = parameters.startCount ?? null;
        this.initialStartDate = parameters.initialStartDate ?? null;
        this.startDates = parameters.startDates ?? null;
        this.completionCount = parameters.completionCount ?? null;
        this.advanceCompeletionDate = parameters.advanceCompeletionDate ?? null;
        this.completionDates = parameters.completionDates ?? null;

        // Progression session adjustments
        this.adjustmentDelayInDays = parameters.adjustmentDelayInDays ?? null;
        this.adjustmentConsiderCompleted = parameters.adjustmentConsiderCompleted ?? null;
        this.adjustmentAdditionalCompletionsRequired = parameters.adjustmentAdditionalCompletionsRequired ?? null;
        this.adjustmentPreponeAvailability = parameters.adjustmentPreponeAvailability ?? null;
        this.adjustmentOverlookUniqueInDays = parameters.adjustmentOverlookUniqueInDays ?? null;
        this.adjustmentImposeReadyToBeDone = parameters.adjustmentImposeReadyToBeDone ?? null;
        this.adjustmentBlockAvailability = parameters.adjustmentBlockAvailability ?? null;
        this.adjustmentRemoveCompletionLimit = parameters.adjustmentRemoveCompletionLimit ?? null;

        // Progression session availaility details
        this.delayPreAvailabilityInDays = parameters.delayPreAvailabilityInDays ?? null;
        this.delayPreAvailabilityInHours = parameters.delayPreAvailabilityInHours ?? null;
        this.isLockedByCompletionLimit = parameters.isLockedByCompletionLimit ?? null;
        this.wouldBeFree = parameters.wouldBeFree ?? null;

        // Progression session current availaility status
        this.isDelayedByPreviousSequential = parameters.isDelayedByPreviousSequential ?? null;
        this.isDelayedByPreviousUniqueInDay = parameters.isDelayedByPreviousUniqueInDay ?? null;
        this.isAvailable = parameters.isAvailable ?? null;
    }
}