const { getTimeLapsedSince } = require('_helpers/time-handler')

module.exports = class UserSummary {
    constructor(data = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const dataCopy = JSON.parse(JSON.stringify(data));

        // Id
        this._id = dataCopy._id ?? null;

        // User information
        this.group = dataCopy.group ?? null;
        this.tags = dataCopy.tags ?? [];
        this.username = dataCopy.username ?? null;
        this.hasNote = Boolean(dataCopy.note);

        // Timestamps
        this.lastLogin = dataCopy.lastLogin ?? null;
        this.createdAt = dataCopy.createdAt ?? null;
        this.updatedAt = dataCopy.updatedAt ?? null;
        this.timeLapsedSinceLastLogin = this.lastLogin ? getTimeLapsedSince(this.lastLogin) : null;
        this.timeLapsedSinceCreatedAt = this.createdAt ? getTimeLapsedSince(this.createdAt) : null;
        this.timeLapsedSinceUpdatedAt = this.updatedAt ? getTimeLapsedSince(this.updatedAt) : null;

        // Curriculum information
        this.curriculumTitle = dataCopy.curriculumTitle ?? null;

        // Progression information
        this.progressionStartDate = dataCopy.progressionStartDate ?? null;
        this.progressionStartTime = dataCopy.progressionStartTime ?? null;
        this.progressionLastAdvancedDate = dataCopy.progressionLastAdvancedDate ?? null;
        this.progressionLastAdvancedTime = dataCopy.progressionLastAdvancedTime ?? null;
        this.progressionDuration = dataCopy.progressionDuration ?? null;

        this.isAdvanceResultOfConsiderCompletedAdjustmentSessions =
            dataCopy.isAdvanceResultOfConsiderCompletedAdjustmentSessions ?? false;
        this.inAdvanceCount = dataCopy.inAdvanceCount ?? 0;
        this.isProgressionBlocked = dataCopy.isProgressionBlocked ?? null;
        this.reachedSessionTitle = dataCopy.reachedSessionTitle ?? null;
        this.progressionCompletedSessionsCount = dataCopy.progressionCompletedSessionsCount ?? 0;
        this.curriculumSessionsCount = dataCopy.curriculumSessionsCount ?? 0;

        this.assignedParameters = dataCopy.assignedParameters ?? {};
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}