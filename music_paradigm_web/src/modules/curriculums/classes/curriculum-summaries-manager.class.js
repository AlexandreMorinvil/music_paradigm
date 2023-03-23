import { CurriculumSummary } from "./curriculum-summary.class"

export class CurriculumSummariesManager {
    constructor(curriculumSummariesList = []) {
        this.curriculumSummariesList = [];
        this.setCurriculumSummariesList(curriculumSummariesList);
    }

    getCurriculumSummaryById(curriculumId) {
        return this.curriculumSummariesList.find((curriculumSummary) => {
            return curriculumSummary._id === curriculumId;
        });
    }

    setCurriculumSummariesList(curriculumSummariesList = []) {
        this.curriculumSummariesList = curriculumSummariesList.map((curriculumSummary) => {
            return new CurriculumSummary(curriculumSummary);
        });
        this.curriculumSummariesList.sort((a, b) => {
            return String(a.title).localeCompare(String(b.title))
        });
    }
}