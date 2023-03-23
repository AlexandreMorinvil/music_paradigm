export default {
    generateStartDatesListByCompletionDateMap
}

function generateStartDatesListByCompletionDateMap(completionDatesList, startDatesList) {
    // Initialize an object where each attribute is a completion date
    const startDatesListByEndDateMap = {};
    let startCounter = 0;

    // Initialize the start dates list for each completion date and also for a 'null' completion date, associated to 
    // a session that would have been started, but not completed. 
    for (const completionDate of completionDatesList) startDatesListByEndDateMap[completionDate] = [];
    startDatesListByEndDateMap[null] = [];

    // Fit the start dates to their associated completion date
    for (const startDate of startDatesList) {
        startCounter += 1;
        const foundCompletionDate = completionDatesList.find((completionDate) => startDate < completionDate);
        const associatedCompletionDate = foundCompletionDate || null;
        startDatesListByEndDateMap[associatedCompletionDate].push({ startDate: startDate, startCount: startCounter });
    }

    // If there is no start date without a completion date, we remove the 'no completion date' entry
    if (startDatesListByEndDateMap[null].length < 1) delete startDatesListByEndDateMap[null];

    return startDatesListByEndDateMap;
}