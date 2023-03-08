import { CurriculumSummary } from "./curriculum-summary.class"

export class CurriculumSummariesHandler {
    constructor(curriculumSummariesList = []) {
        this.curriculumSummariesList = curriculumSummariesList.map((curriculumSummary) => {
            return new CurriculumSummary(curriculumSummary);
        })
    }
}