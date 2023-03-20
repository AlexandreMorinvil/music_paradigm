export default {
    formatDurationWeekToSecondsFromLargerUnit,
};

function formatDurationWeekToSecondsFromLargerUnit(durationInMilliseconds, elementsTotal = 1, mustAppendPreposition = false) {
    if (!isDurationValid(durationInMilliseconds)) return null;
    const { isPositive, weeks, days, hours, minutes, seconds } = parsedDuration(durationInMilliseconds);
    let timeLapsed = '';
    let elementsCount = 0;
    const maxElements = Math.max(1, elementsTotal);
    let includesLongerDuration = false;
    if (weeks > 0 && elementsCount < maxElements) {
        timeLapsed += String(weeks) + (weeks === 1 ? 'week ' : 'weeks ');
        includesLongerDuration = true;
        elementsCount += 1;
    }
    if ((includesLongerDuration || days > 0) && elementsCount < maxElements) {
        timeLapsed += String(days) + (days === 1 ? 'day ' : 'days ');
        includesLongerDuration = true;
        elementsCount += 1;
    }
    if ((includesLongerDuration || hours > 0) && elementsCount < maxElements) {
        timeLapsed += String(hours) + 'h. ';
        includesLongerDuration = true;
        elementsCount += 1;
    }
    if ((includesLongerDuration || minutes > 0) && elementsCount < maxElements) {
        timeLapsed += String(minutes) + 'min. ';
        includesLongerDuration = true;
        elementsCount += 1;
    }
    if ((includesLongerDuration || seconds > 0) && elementsCount < maxElements) {
        timeLapsed += String(seconds) + 'sec. ';
        elementsCount += 1;
    }
    if (mustAppendPreposition) {
        if (isPositive) timeLapsed += 'ago';
        else timeLapsed = 'in ' + timeLapsed;
    }
    return timeLapsed;
}

function parsedDuration(durationInMilliseconds) {
    const isPositive = durationInMilliseconds >= 0;
    let durationLeft = durationInMilliseconds;
    const weeks = Math.floor(Math.abs(durationLeft / (1000 * 60 * 60 * 24 * 7)));
    durationLeft %= 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(Math.abs(durationLeft / (1000 * 60 * 60 * 24)));
    durationLeft %= 1000 * 60 * 60 * 24;
    const hours = Math.floor(Math.abs(durationLeft / (1000 * 60 * 60)));
    durationLeft %= 1000 * 60 * 60;
    const minutes = Math.floor(Math.abs(durationLeft / (1000 * 60)));
    durationLeft %= 1000 * 60;
    const seconds = Math.floor(Math.abs(durationLeft / 1000));
    return { isPositive: isPositive, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds };
}

function isDurationValid(duration) {
    return typeof duration === 'number';
}
