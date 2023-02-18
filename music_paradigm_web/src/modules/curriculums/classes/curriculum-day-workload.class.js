export class CurriculumDayWorkload {
    constructor(delayInDays, isDelayDueToUniqueInDay) {
        this.delayInDays = delayInDays;
        this.sessionsList =  [];
        this.isDelayDueToUniqueInDay = isDelayDueToUniqueInDay;
    }

    addSession(session) {
        this.sessionsList.push(session);
    }
}