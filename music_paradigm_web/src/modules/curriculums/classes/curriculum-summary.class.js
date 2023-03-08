export class CurriculumSummary {
    constructor(curriculumSummary = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const curriculumSummaryCopy = JSON.parse(JSON.stringify(curriculumSummary));

        // Curriculum information
        this._id = curriculumSummaryCopy._id || null;
        this.title = curriculumSummaryCopy.title || ''; 
        this.isSequential = curriculumSummaryCopy.isSequential || null;
        this.logType = curriculumSummaryCopy.logType || '';
        this.sessionsList = curriculumSummaryCopy.sessionsList || curriculumSummaryCopy.experiments || [];

        // Timestamps
        this.createdAt = curriculumSummaryCopy.createdAt;
        this.updatedAt = curriculumSummaryCopy.updatedAt;

        // Task parameters information
        this.parameterOptionValuesListMap = curriculumSummaryCopy.parameterOptionValuesListMap || {};
        this.parameterDefaultValueMap = curriculumSummaryCopy.parameterDefaultValueMap || {};
        this.parameterAcceptsFreeTextValuesMap = curriculumSummaryCopy.parameterAcceptsFreeTextValuesMap || {};
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}