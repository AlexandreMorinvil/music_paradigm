export default {
    formatDateYearToDay,
    formatDateYearToMinutes,
    formatDateYearToSeconds,
    formatDateYearToSecondsWithWeekday,
};

// TODO : Replace all the "datesOptions" of the code by these functions

function formatDateYearToDay(date) {
    return new Date(date).toLocaleDateString(
        undefined, // Locale 
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }
    );
}

function formatDateYearToMinutes(date) {
    return new Date(date).toLocaleDateString(
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
    return new Date(date).toLocaleDateString(
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
    return new Date(date).toLocaleDateString(
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