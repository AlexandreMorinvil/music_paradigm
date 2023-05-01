export class TaskDataSummary {
    constructor(data = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const dataCopy = JSON.parse(JSON.stringify(data));

        // Data to identifiy a task data entry
        this.username = dataCopy.username ?? null;

        this.logTags = dataCopy.logTags ?? [];

        this.curriculum = dataCopy.curriculum ?? null;
        this.curriculumTitle = dataCopy.curriculumTitle ?? null;

        this.associativeId = dataCopy.associativeId ?? null;
        this.associativeIdOrdinalNumber = dataCopy.associativeIdOrdinalNumber ?? null;

        this.task = dataCopy.task ?? null;
        this.taskGroup = dataCopy.taskGroup ?? null;
        this.taskName = dataCopy.taskName ?? null;
        this.taskVersion = dataCopy.taskVersion ?? null;

        this.logLabel = dataCopy.logLabel ?? null;

        this.completion = dataCopy.completion ?? null;
        
        // Timestamps
        this.createdAt = dataCopy.createdAt ?? null;
        this.updatedAt = dataCopy.updatedAt ?? null;
        this.timeLapsedSinceCreatedAt = dataCopy.timeLapsedSinceCreatedAt ?? null;
        this.timeLapsedSinceUpdatedAt = dataCopy.timeLapsedSinceUpdatedAt ?? null;
        
        this.startDate = dataCopy.startDate ?? [];	
        this.lastDate = dataCopy.lastDate ?? [];

        this.firstStartDate = dataCopy.firstStartDate ?? null;
        this.completionDate = dataCopy.completionDate ?? null;
        this.timeLapsedSinceFirstStartDate = dataCopy.timeLapsedSinceFirstStartDate ?? null;
        this.timeLapsedSinceCompletionDate = dataCopy.timeLapsedSinceCompletionDate ?? null;
    }
}