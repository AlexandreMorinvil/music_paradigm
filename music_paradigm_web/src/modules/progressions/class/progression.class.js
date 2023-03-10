export class Progression {
    constructor(progression = {}) {
        this._id = progression._id || null;

        this.userReference = progression.userReference || null;
        this.curriculumReference = progression.curriculumReference || null;
        this.startTime = progression.startTime || null;
        this.adjustmentStartTimeInDays = progression.adjustmentStartTimeInDays || 0;
        this.lastProgressionDate = progression.lastProgressionDate || null;
        this.assignedParameters = progression.assignedParameters || null;
        this.experiments = JSON.parse(JSON.stringify(progression.experiments || []));
    }

    toObject() {
        const { ...object } = this;
        return object;
    }
}