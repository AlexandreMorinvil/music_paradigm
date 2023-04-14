const { getTimeLapsedSince } = require('_helpers/time-handler')

module.exports  = class UserSummary {
    constructor(parameter = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const parameterCopy = JSON.parse(JSON.stringify(parameter));

        // Id
        this._id = parameterCopy._id ?? null;

        // User information
        this.group = parameterCopy.group ?? null;
        this.tags = parameterCopy.tags ?? [];
        this.username = parameterCopy.username ?? null;
        
        // Timestamps
        this.lastLogin = parameterCopy.lastLogin ?? null;
        this.createdAt = parameterCopy.createdAt ?? null;
        this.updatedAt = parameterCopy.updatedAt ?? null;
        this.timeLapsedSinceLastLogin = this.lastLogin ? getTimeLapsedSince(this.lastLogin) : null;
        this.timeLapsedSinceCreatedAt = this.createdAt ? getTimeLapsedSince(this.createdAt) : null;
        this.timeLapsedSinceUpdatedAt = this.updatedAt ? getTimeLapsedSince(this.updatedAt) : null;
        
        // Curriculum information
        this.curriculumTitle = parameterCopy.curriculumTitle ?? null;

        // Progression information
        this.progressionStartDate = parameterCopy.progressionStartDate ?? null; 
        this.progressionStartTime = parameterCopy.progressionStartTime ?? null; 
        this.progressionLastAdvancedDate = parameterCopy.progressionLastAdvancedDate ?? null; 
        this.progressionLastAdvancedTime = parameterCopy.progressionLastAdvancedTime ?? null; 
        this.progressionDuration = parameterCopy.progressionDuration ?? null;

        this.isAdvanceResultOfConsiderCompletedAdjustmentSessions = parameterCopy.isAdvanceResultOfConsiderCompletedAdjustmentSessions ?? false;
        this.inAdvanceCount = parameterCopy.inAdvanceCount ?? 0;
        this.isProgressionBlocked = parameterCopy.isProgressionBlocked ?? null;
        this.reachedSessionTitle = parameterCopy.reachedSessionTitle ?? null;
        this.progressionCompletedSessionsCount = parameterCopy.progressionCompletedSessionsCount ?? 0;
        this.curriculumSessionsCount = parameterCopy.curriculumSessionsCount ?? 0;

        // Durations
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}