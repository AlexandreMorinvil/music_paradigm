export class CurriculumDayWorkload {
    constructor(delayInDays, isDelayDueToUniqueInDay, indexInCurriculumOfFirstSession = 0) {
        this.delayInDays = delayInDays;
        this.sessionsList =  [];
        this.indexInCurriculumOfFirstSession = indexInCurriculumOfFirstSession;
        this.isDelayDueToUniqueInDay = isDelayDueToUniqueInDay;
    }

    addSession(session) {
        this.sessionsList.push(session);
    }
}