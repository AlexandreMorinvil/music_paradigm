const sessionManager = require('sessions/session.manager');

module.exports = {
    initializeSession,
    concludeSession,
    saveSessionState,
};

async function initializeSession(userId, associativeId, associativeIdOrdinalNumber) {
    try {
        await sessionManager.initializeSession(userId, associativeId, associativeIdOrdinalNumber);
        return;
    } catch (err) {
        throw err;
    }
}

async function concludeSession(userId, associativeId, associativeIdOrdinalNumber, isInTimeUp) {
    try {
        await sessionManager.concludeSession(userId, associativeId, associativeIdOrdinalNumber, isInTimeUp);
        return;
    } catch (err) {
        throw err;
    }
}

async function saveSessionState(userId, associativeId, cursor, state, timeIndicated) {
    try {
        await sessionManager.saveSessionState(userId, associativeId, cursor, state, timeIndicated);
        return;
    } catch (err) {
        throw err;
    }
}