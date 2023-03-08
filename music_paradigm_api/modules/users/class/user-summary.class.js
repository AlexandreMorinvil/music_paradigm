module.exports  = class UserSummary {
    constructor(userObject = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const userObjectCopy = JSON.parse(JSON.stringify(userObject));

        // User information
        this.group = userObjectCopy.group || '';
        this.tags = userObjectCopy.tags || [];
        this.username = userObjectCopy.username || '';
        
        // Timestamps
        this.lastLogin = userObjectCopy.lastLogin || null;
        this.createdAt = userObjectCopy.createdAt || null;
        this.updatedAt = userObjectCopy.updatedAt || null;
        
        // Curriculum information
        this.curriculumTitle = userObjectCopy.curriculumTitle || null;

        // Progression information
        this.progressionStartDate = userObjectCopy.progressionStartDate || null; 
        this.progressionStartTime = userObjectCopy.progressionStartTime || null; 
        this.progressionLastAdvancedDate = userObjectCopy.progressionLastAdvancedDate || null; 
        this.progressionLastAdvancedTime = userObjectCopy.progressionLastAdvancedTime || null; 
        this.progressionDuration = userObjectCopy.progressionDuration || null;
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}