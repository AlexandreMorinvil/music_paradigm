export class UserSummary {
    constructor(data = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const dataCopy = JSON.parse(JSON.stringify(data));

        // Id
        this._id = dataCopy._id ?? null;

        // User information
        this.group = dataCopy.group ?? null;
        this.hasNote = dataCopy.hasNote ?? null;
        this.tags = dataCopy.tags ?? [];
        this.username = dataCopy.username ?? null;

        // Timestamps
        this.lastLogin = dataCopy.lastLogin ?? null;
        this.createdAt = dataCopy.createdAt ?? null;
        this.updatedAt = dataCopy.updatedAt ?? null;
        this.timeLapsedSinceLastLogin = dataCopy.timeLapsedSinceLastLogin ?? null;
        this.timeLapsedSinceCreatedAt = dataCopy.timeLapsedSinceCreatedAt ?? null;
        this.timeLapsedSinceUpdatedAt = dataCopy.timeLapsedSinceUpdatedAt ?? null;

        // Curriculum information
        this.curriculumTitle = dataCopy.curriculumTitle ?? null;

        // Progression information
        this.progressionStartDate = dataCopy.progressionStartDate ?? null;
        this.progressionStartTime = dataCopy.progressionStartTime ?? null;
        this.progressionLastAdvancedDate = dataCopy.progressionLastAdvancedDate ?? null;
        this.progressionLastAdvancedTime = dataCopy.progressionLastAdvancedTime ?? null;
        this.progressionDuration = dataCopy.progressionDuration ?? null;

        this.isAdvanceResultOfConsiderCompletedAdjustmentSessions =
            dataCopy.isAdvanceResultOfConsiderCompletedAdjustmentSessions ?? null;
        this.inAdvanceCount = dataCopy.inAdvanceCount ?? null;
        this.isProgressionBlocked = dataCopy.isProgressionBlocked ?? null;
        this.reachedSessionTitle = dataCopy.reachedSessionTitle ?? null;
        this.progressionCompletedSessionsCount = dataCopy.progressionCompletedSessionsCount ?? null;
        this.curriculumSessionsCount = dataCopy.curriculumSessionsCount ?? null;

        this.assignedParameters = dataCopy.assignedParameters ?? {};
    }
}