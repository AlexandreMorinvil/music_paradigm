import { TaskDataSummary } from "./task-data-summary.class"

export class TaskDataSummariesManager {
    constructor(taskDataSummariesList = []) {
        this.taskDataSummariesList = [];
        this.setTaskDataSummariesList(taskDataSummariesList);
    }

    getTaskDataSummaryById(curriculumId) {
        return this.taskDataSummariesList.find((taskDataSummary) => {
            return taskDataSummary._id === curriculumId;
        });
    }

    setTaskDataSummariesList(taskDataSummariesList = []) {
        this.taskDataSummariesList = taskDataSummariesList.map((taskDataSummary) => {
            return new TaskDataSummary(taskDataSummary);
        });
    }
}