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

    curriculumSessionsList.forEach((curriculumSession, index) => {

        const delayInDays = curriculumSession.delayInDays;
        const isUniqueInDay = curriculumSession.isUniqueInDay;
        const isFirstSession = index === 0;

        let daysLeftBeforeNextSession = 0;
        if (isFirstSession)
            daysLeftBeforeNextSession = 0;
        else if (isSequential)
            daysLeftBeforeNextSession = delayInDays;
        else
            daysLeftBeforeNextSession = Math.min(delayInDays - currentDay, 0);

        if (daysLeftBeforeNextSession > 0) {
            currentDay += daysLeftBeforeNextSession;
            dayWorkload = new CurriculumDayWorkload(
                currentDay,
                false /* isDelayDueToUniqueInDay */,
                index /* indexInCurriculumOfFirstSession */
            );
            dayWorkloadList.push(dayWorkload);
        }
        else if (wasPreviousSessionUniqueInDay) {
            currentDay += 1;
            dayWorkload = new CurriculumDayWorkload(
                currentDay,
                true /* isDelayDueToUniqueInDay */,
                index /* indexInCurriculumOfFirstSession */
            );
            dayWorkloadList.push(dayWorkload);
        }

        dayWorkload.addSession(curriculumSession);

        wasPreviousSessionUniqueInDay = isUniqueInDay;
    });

    return dayWorkloadList
}