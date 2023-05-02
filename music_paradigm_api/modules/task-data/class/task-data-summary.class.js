const { getTimeLapsedSince } = require('_helpers/time-handler')

module.exports = class TaskDataSummary {
    constructor(data = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const dataCopy = JSON.parse(JSON.stringify(data));

        // Data to identifiy a task data entry
        this._id = dataCopy._id ?? null;

        // Data of the task data entry
        this.username = dataCopy.username ?? null;

        this.logTags = dataCopy.logTags ?? [];

        this.curriculum = dataCopy.curriculum ?? null;
        this.curriculumTitle = dataCopy.curriculumTitle ?? null;

        this.associativeId = dataCopy.associativeId ?? null;
        this.associativeIdOrdinalNumber = dataCopy.associativeIdOrdinalNumber ?? null;

        this.task = dataCopy.task ?? null;
        this.taskGroup = dataCopy.experimentGroup ?? null;
        this.taskName = dataCopy.experimentName ?? null;
        this.taskVersion = dataCopy.experimentVersion ?? null;

        this.logLabel = dataCopy.logLabel ?? null;

        this.completion = dataCopy.completion ?? null;

        // Timestamps
        this.createdAt = dataCopy.createdAt ?? null;
        this.updatedAt = dataCopy.updatedAt ?? null;
        this.timeLapsedSinceCreatedAt = this.createdAt ? getTimeLapsedSince(this.createdAt) : null;
        this.timeLapsedSinceUpdatedAt = this.updatedAt ? getTimeLapsedSince(this.updatedAt) : null;

        this.startTimestamp = dataCopy.startTimestamp ?? [];
        this.endTimestamp = dataCopy.endTimestamp ?? [];

        this.firstStartDate = this.startTimestamp[0] ?? null;
        this.completionDate = this.endTimestamp[this.endTimestamp.length - 1]?.time ?? null;
        this.timeLapsedSinceFirstStartDate = this.firstStartDate ? getTimeLapsedSince(this.firstStartDate) : null;
        this.timeLapsedSinceCompletionDate = this.completionDate ? getTimeLapsedSince(this.completionDate) : null;
    }
}