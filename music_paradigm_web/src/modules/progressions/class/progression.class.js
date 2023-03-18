export class Progression {
    constructor(progression = {}) {
        const progressionToParse = JSON.parse(JSON.stringify(progression || {}));

        this._id = progressionToParse._id || null;

        this.userReference = progressionToParse.userReference || null;
        this.curriculumReference = progressionToParse.curriculumReference || null;
        this.startTime = progressionToParse.startTime || null;
        this.adjustmentStartTimeInDays = progressionToParse.adjustmentStartTimeInDays || 0;
        this.lastProgressionDate = progressionToParse.lastProgressionDate || null;
        this.assignedParameters = progressionToParse.assignedParameters || {};
        this.experiments = progressionToParse.experiments;
    }

    setAssignedParameterValue(parameterName, value) {
        return this.assignedParameters[parameterName] = value;
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}