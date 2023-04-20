export class UserSummary {
    constructor(parameter = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const parameterCopy = JSON.parse(JSON.stringify(parameter));

        // Id
        this._id = parameterCopy._id ?? null;

        // User information
        this.group = parameterCopy.group ?? null;
        this.hasNote = parameterCopy.hasNote ?? null;
        this.tags = parameterCopy.tags ?? [];
        this.username = parameterCopy.username ?? null;

        // Timestamps
        this.lastLogin = parameterCopy.lastLogin ?? null;
        this.createdAt = parameterCopy.createdAt ?? null;
        this.updatedAt = parameterCopy.updatedAt ?? null;
        this.timeLapsedSinceLastLogin = parameterCopy.timeLapsedSinceLastLogin ?? null;
        this.timeLapsedSinceCreatedAt = parameterCopy.timeLapsedSinceCreatedAt ?? null;
        this.timeLapsedSinceUpdatedAt = parameterCopy.timeLapsedSinceUpdatedAt ?? null;

        // Curriculum information
        this.curriculumTitle = parameterCopy.curriculumTitle ?? null;

        // Progression information
        this.progressionStartDate = parameterCopy.progressionStartDate ?? null;
        this.progressionStartTime = parameterCopy.progressionStartTime ?? null;
        this.progressionLastAdvancedDate = parameterCopy.progressionLastAdvancedDate ?? null;
        this.progressionLastAdvancedTime = parameterCopy.progressionLastAdvancedTime ?? null;
        this.progressionDuration = parameterCopy.progressionDuration ?? null;

        this.isAdvanceResultOfConsiderCompletedAdjustmentSessions =
            parameterCopy.isAdvanceResultOfConsiderCompletedAdjustmentSessions ?? null;
        this.inAdvanceCount = parameterCopy.inAdvanceCount ?? null;
        this.isProgressionBlocked = parameterCopy.isProgressionBlocked ?? null;
        this.reachedSessionTitle = parameterCopy.reachedSessionTitle ?? null;
        this.progressionCompletedSessionsCount = parameterCopy.progressionCompletedSessionsCount ?? null;
        this.curriculumSessionsCount = parameterCopy.curriculumSessionsCount ?? null;
    }
}