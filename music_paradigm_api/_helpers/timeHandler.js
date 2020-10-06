module.exports = {
    calculateDaysElapsed
};

const millisecondsInOneDay = 24 * 60 * 60 * 1000;

function calculateDaysElapsed(referenceDate) {
    return Math.round(Math.abs(Date.now() - referenceDate) / millisecondsInOneDay);
}