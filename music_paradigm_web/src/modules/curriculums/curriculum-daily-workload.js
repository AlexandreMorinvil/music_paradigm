import { CurriculumDayWorkload } from "./classes/curriculum-day-workload.class";

export default {
    generateCurriculumDayWorkloadList
}

function generateCurriculumDayWorkloadList(curriculum) {
    
    if (!curriculum) return [];

    const dayWorkloadList = [];
    const isSequential = curriculum.isSequential;
    const curriculumSessionsList = curriculum.experiments;

    let currentDay = 0;
    let dayWorkload = new CurriculumDayWorkload(currentDay, false);
    dayWorkloadList.push(dayWorkload);

    let wasPreviousSessionUniqueInDay = false;

    curriculumSessionsList.forEach(curriculumSession => {

        const delayInDays = curriculumSession.delayInDays;
        const isUniqueInDay = curriculumSession.isUniqueInDay;
        let daysLeftBeforeNextSession = isSequential ?
            delayInDays :
            Math.min(delayInDays - currentDay, 0);

        if (daysLeftBeforeNextSession > 0) {
            currentDay += daysLeftBeforeNextSession;
            dayWorkload = new CurriculumDayWorkload(currentDay, false /* isDelayDueToUniqueInDay */);
            dayWorkloadList.push(dayWorkload);
        }
        else if (wasPreviousSessionUniqueInDay) {
            currentDay += 1;
            dayWorkload = new CurriculumDayWorkload(currentDay, true /* isDelayDueToUniqueInDay */);
            dayWorkloadList.push(dayWorkload);
        }

        dayWorkload.addSession(curriculumSession)

        wasPreviousSessionUniqueInDay = isUniqueInDay;
    });

    return dayWorkloadList
}