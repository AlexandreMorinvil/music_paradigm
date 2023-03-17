module.exports  = class UserSummary {
    constructor(parameter = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const parameterCopy = JSON.parse(JSON.stringify(parameter));

        // ID
        this._id = parameterCopy._id || null;

        // User information
        this.group = parameterCopy.group || '';
        this.tags = parameterCopy.tags || [];
        this.username = parameterCopy.username || '';
        
        // Timestamps
        this.lastLogin = parameterCopy.lastLogin || null;
        this.createdAt = parameterCopy.createdAt || null;
        this.updatedAt = parameterCopy.updatedAt || null;
        
        // Curriculum information
        this.curriculumTitle = parameterCopy.curriculumTitle || null;

        // Progression information
        this.progressionStartDate = parameterCopy.progressionStartDate || null; 
        this.progressionStartTime = parameterCopy.progressionStartTime || null; 
        this.progressionLastAdvancedDate = parameterCopy.progressionLastAdvancedDate || null; 
        this.progressionLastAdvancedTime = parameterCopy.progressionLastAdvancedTime || null; 
        this.progressionDuration = parameterCopy.progressionDuration || null;

        this.wasProgressionTotalNumberAdjusted = parameterCopy.wasProgressionTotalNumberAdjusted || false;
        this.inAdvanceCount = parameterCopy.inAdvanceCount || 0;
        this.isProgressionBlocked = parameterCopy.isProgressionBlocked || null;
        this.reachedExperimentTitle = parameterCopy.reachedExperimentTitle || null;
        this.progressionTotalNumber = parameterCopy.progressionTotalNumber || 0;
        this.curriculumTotalNumber = parameterCopy.curriculumTotalNumber || 0;
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}