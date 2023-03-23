module.exports  = class CurriculumSummary {
    constructor(curriculumListEntry = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const listEntry = JSON.parse(JSON.stringify(curriculumListEntry));

        // Curriculum information
        this._id = listEntry._id || null;
        this.title = listEntry.title || ''; 
        this.isSequential = listEntry.isSequential || null;
        this.logType = listEntry.logType || '';
        this.sessionsList = listEntry.sessionsList || listEntry.experiments || [];

        // Timestamps
        this.createdAt = listEntry.createdAt;
        this.updatedAt = listEntry.updatedAt;

        // Task parameters information
        this.parameterOptionValuesListMap = listEntry.parameterOptionValuesListMap || {};
        this.parameterDefaultValueMap = listEntry.parameterDefaultValueMap || {};
        this.parameterAcceptsFreeTextValuesMap = listEntry.parameterAcceptsFreeTextValuesMap || {};
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}