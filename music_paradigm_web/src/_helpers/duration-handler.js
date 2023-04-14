export default {
    constructDuration,
    formatDurationWeekToSecondsFromLargerUnit,
    formatTimerTime,
    isDurationValid,
    parsedDuration,
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

function formatTimerTime(time) {
    const { seconds, minutes, hours, days } = parseTimerTime(Number(time));

    if (seconds <= 0 && seconds <= 0 && seconds <= 0 && seconds <= 0) return 'Time reset';

    let display = `${minutes}:${seconds}`;
    if (hours > 0 || days > 0) display = `:${hours}:${display}`;
    if (days > 0) display = `:${days}:${display}`;

    return display;
}

function constructDuration({ isPositive, weeks, days, hours, minutes, seconds }) {
    let durationInMilliseconds = 0;
    durationInMilliseconds += ((seconds || 0) * 1000);
    durationInMilliseconds += ((minutes || 0) * 1000 * 60);
    durationInMilliseconds += ((hours || 0) * 1000 * 60 * 60);
    durationInMilliseconds += ((days || 0) * 1000 * 60 * 60 * 24);
    durationInMilliseconds += ((weeks || 0) * 1000 * 60 * 60 * 24 * 7);
    durationInMilliseconds *= (isPositive ?? true) ? 1 : -1;
    return durationInMilliseconds;
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
    return { isPositive, weeks, days, hours, minutes, seconds };
}

function parseTimerTime(milliseconds = 0) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const numberFormattingOptions = { minimumIntegerDigits: 2, useGrouping: false };
    return {
        seconds: seconds.toLocaleString('en-US', numberFormattingOptions),
        minutes: minutes.toLocaleString('en-US', numberFormattingOptions),
        hours: hours.toLocaleString('en-US', numberFormattingOptions),
        days: days.toLocaleString('en-US', numberFormattingOptions),
    };
}

function isDurationValid(duration) {
    return typeof duration === 'number';
}