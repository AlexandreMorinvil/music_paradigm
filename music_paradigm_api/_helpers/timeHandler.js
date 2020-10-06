module.exports = {
    calculateDaysElapsed,
    isToday
};

const millisecondsInOneDay = 24 * 60 * 60 * 1000;

function calculateDaysElapsed(referenceDate) {
    return Math.round(Math.abs(Date.now() - referenceDate) / millisecondsInOneDay);
}

function isToday(referenceDate) {
    return Math.round(Math.abs(Date.now() - referenceDate) / millisecondsInOneDay) < 1;
}