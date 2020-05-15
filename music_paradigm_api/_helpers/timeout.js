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
    let wait;
    let timeout = new Promise((resolve, reject) => {
        wait = setTimeout(() => {
            reject(timeoutMessage)
        }, ms)
    })

    // Returns a race between our timeout and the passed in promise
    return Promise.race([
        promise,
        timeout
    ])
    .then((result) => {
        // Disable the setTimeout promess to avoid having unhandled rejections
        clearTimeout(wait)
        // Tranfer the result of the resolve
        return result
      })
}

function promiseDatabaseTimeout(promise) {
    return promiseTimeout(promise, 5000, DATABASE_TIMEOUT_MESSAGE)
}