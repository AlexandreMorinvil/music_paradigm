const { getTimeLapsedSince } = require('_helpers/time-handler')

module.exports  = class CurriculumSummary {
    constructor(data = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const dataCopy = JSON.parse(JSON.stringify(data));

        // Curriculum information
        this._id = dataCopy._id ?? null;
        this.title = dataCopy.title ?? null; 
        this.isSequential = dataCopy.isSequential ?? null;
        this.logType = dataCopy.logType ?? '';
        this.sessionsList = dataCopy.sessionsList ?? dataCopy.experiments ?? [];

        // Timestamps
        this.createdAt = dataCopy.createdAt ?? null;
        this.updatedAt = dataCopy.updatedAt ?? null;
        this.timeLapsedSinceCreatedAt = this.createdAt ? getTimeLapsedSince(this.createdAt) : null;
        this.timeLapsedSinceUpdatedAt = this.updatedAt ? getTimeLapsedSince(this.updatedAt) : null;

        // Progressions with the curriculum
        this.progressionsInvolvedCount = dataCopy.progressionsInvolvedList?.length ?? null;

        // Task parameters information
        this.parametersList = dataCopy.parametersList ?? [];
    }
}