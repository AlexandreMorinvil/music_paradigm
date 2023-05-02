export class TaskDataEntry {
    constructor(data = {}) {
        // Deep copy to avoid oject and array shallow copies.
        const dataCopy = JSON.parse(JSON.stringify(data));

        // Data to identifiy a task data entry
        this._id = dataCopy._id ?? null;

        // Data of the task data entry
        this.data = dataCopy ?? {};
    }
}