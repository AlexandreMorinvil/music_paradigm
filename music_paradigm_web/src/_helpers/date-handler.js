export default {
    formatDateYearToDay,
    formatDateYearToMinutes,
    formatDateYearToSeconds,
    formatDateYearToSecondsWithWeekday,
};

// TODO : Replace all the "datesOptions" of the code by these functions

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
    return Boolean(date);
}