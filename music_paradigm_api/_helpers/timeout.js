module.exports = promiseTimeout;

// Exports
module.exports = {
    limitTime : promiseTimeout,
    dbQuery : promiseDatabaseTimeout
};

const DEFAULT_TIMEOUT_MESSAGE = 'Timeout : A server operation took too long';
const DATABASE_TIMEOUT_MESSAGE = 'Timeout : Unable to fetch the database';

function promiseTimeout(promise, ms, timeoutMessage = DEFAULT_TIMEOUT_MESSAGE) {

    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
            clearTimeout(wait);
            reject(timeoutMessage)
        }, ms)
    })

    // Returns a race between our timeout and the passed in promise
    return Promise.race([
        promise,
        timeout
    ])
}

function promiseDatabaseTimeout(promise) {
    return promiseTimeout(promise, 5000, DATABASE_TIMEOUT_MESSAGE)
}