export class Progression {
    constructor(progression = {}) {
        const progressionToParse = JSON.parse(JSON.stringify(progression || {}));

        this._id = progressionToParse._id || null;

        this.userReference = progressionToParse.userReference || null;
        this.curriculumReference = progressionToParse.curriculumReference || null;

        this.startTime = progressionToParse.startTime || null;
        this.adjustmentStartTimeInDays = progressionToParse.adjustmentStartTimeInDays || 0;
        this.assignedParameters = progressionToParse.assignedParameters || {};
        this.lastProgressionDate = progressionToParse.lastProgressionDate || null;
        this.experiments = progressionToParse.experiments;

        this.startTimePassed = progressionToParse.startTimePassed;
        this.lastProgessionTimePassed = progressionToParse.lastProgessionTimePassed;
        this.duration = progressionToParse.duration;
    }

    clearAssignedParameters() {
        this.assignedParameters = {};
    }

    setAssignedParameterValue(parameterName, value) {
        // Vue cannot detect property addition or deletion, so we assign the new attribute by replacing the object
        this.assignedParameters = Object.assign({}, this.assignedParameters, { [parameterName]: value });
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}