export class CurriculumDayWorkload {
    constructor(delayInDays, isDelayDueToUniqueInDay, indexInCurriculumOfFirstSession = 0) {
        this.delayInDays = delayInDays;
        this.sessionsList =  [];
        this.indexInCurriculumOfFirstSession = indexInCurriculumOfFirstSession;
        this.isDelayDueToUniqueInDay = isDelayDueToUniqueInDay;
        this.isLastDayOfCurriculum = false;
    }

    addSession(session) {
        this.sessionsList.push(session);
    }

    getLastSessionIndex() {
        return this.sessionsList.length - 1;
    }

    getSessionAtIndex(index) {
        return this.sessionsList[index];
    }

    getSessionIndexInCurriculum(indexInDayWorkload) {
        return this.indexInCurriculumOfFirstSession + indexInDayWorkload;
    }

    isLastSessionUniqueInDay() {
        const lastSession = this.sessionsList.slice(-1).pop();
        return lastSession.isUniqueInDay;
    }

    setAsLastDayOfCurriculum() {
        this.isLastDayOfCurriculum = true;
    }
}