import { CurriculumTaskParameter } from "./curriculum-task-parameter.class";

export class CurriculumSummary {
    constructor(data = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const dataCopy = JSON.parse(JSON.stringify(data));

        // Curriculum information
        this._id = dataCopy._id ?? null;
        this.title = dataCopy.title ?? '';
        this.isSequential = dataCopy.isSequential ?? null;
        this.logType = dataCopy.logType ?? null;
        this.sessionsList = dataCopy.sessionsList ?? dataCopy.experiments ?? [];

        // Timestamps
        this.createdAt = dataCopy.createdAt ?? null;
        this.updatedAt = dataCopy.updatedAt ?? null;
        this.timeLapsedSinceCreatedAt = dataCopy.timeLapsedSinceCreatedAt ?? null;
        this.timeLapsedSinceUpdatedAt = dataCopy.timeLapsedSinceUpdatedAt ?? null;

        // Progressions with the curriculum
        this.progressionsInvolvedCount = dataCopy.progressionsInvolvedCount ?? null;

        // Task parameters
        this.parametersList = [];
        this.parametersList = this.parseParametersList(dataCopy.parametersList);
    }

    parseParametersList(parametersList) {
        return parametersList.map((parameter) => new CurriculumTaskParameter(parameter));
    }

    getBlankParametersAssignation() {
        const unsetParametersAssignation = {};
        this.parametersList.forEach((parameter) => {
            unsetParametersAssignation[parameter.name] = null;
        });
        return unsetParametersAssignation;
    }
}