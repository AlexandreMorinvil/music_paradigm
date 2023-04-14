export default {
    areSameDay,
    formatDateYearToDay,
    formatDateYearToMinutes,
    formatDateYearToSeconds,
    formatDateYearToSecondsWithWeekday,
};

// TODO : Replace all the "datesOptions" of the code by these functions

function areSameDay(d1, d2) {
    const date1 = typeof d1 === 'object' ? d1 : new Date(d1);
    const date2 = typeof d2 === 'object' ? d2 : new Date(d2);
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

function formatDateYearToDay(date) {
    return !isValidDate(date) ? null :
        new Date(date).toLocaleDateString(
            undefined, // Locale 
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }
        );
}

function formatDateYearToMinutes(date) {
    return !isValidDate(date) ? null :
        new Date(date).toLocaleDateString(
            undefined, // Locale 
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }
        );
}

function formatDateYearToSeconds(date) {
    return !isValidDate(date) ? null :
        new Date(date).toLocaleDateString(
            undefined, // Locale 
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            }
        );
}

function formatDateYearToSecondsWithWeekday(date) {
    return !isValidDate(date) ? null :
        new Date(date).toLocaleDateString(
            undefined, // Locale 
            {
                weekday: 'long',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            }
        );
}

function isValidDate(date) {
    if (!date) return false;
    else if (date.getTime) return !isNaN(date.getTime());
    else return !isNaN(new Date(date).getTime());
}