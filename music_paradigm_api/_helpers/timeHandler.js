const moment = require('moment');

module.exports = {
    getHoursMinuteLeft,
    timeAsMinutes,
    calculateDaysElapsed,
    isToday,
};

function getHoursMinuteLeft(releaseTimeInHours) {
    const numbers = releaseTimeInHours.split(":");
    const hours = Number(numbers[0]) 
    const minutes = Number(numbers[1]);

    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const curentMinutes = currentTime.getMinutes();

    let hoursLeft = hours - currentHours;
    if (hoursLeft < 0) return '00:00';
    let minutesLeft = minutes - curentMinutes;

    if (hoursLeft   < 10) {hoursLeft   = "0"+hoursLeft;}
    if (minutesLeft < 10) {minutesLeft = "0"+minutesLeft;}
    return hoursLeft+':'+minutesLeft;
}

function timeAsMinutes(time) {
    const numbers = time.split(":");
    return number = 60 * Number(numbers[0]) + Number(numbers[1]);
}

function calculateDaysElapsed(referenceDate) {
    return moment().diff(referenceDate, 'days');
}

function isToday(referenceDate) {
    if(!referenceDate) return false;
    const today = new Date()
    return referenceDate.getDate() == today.getDate() &&
        referenceDate.getMonth() == today.getMonth() &&
        referenceDate.getFullYear() == today.getFullYear();
}