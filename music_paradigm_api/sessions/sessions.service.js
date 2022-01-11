const sessionManager = require('sessions/session.manager');
const User = require('database/db').User;

module.exports = {
    initializeSession,
    concludeSession,
    saveSessionState,
};

async function initializeSession(userId, associativeId, associativeIdOrdinalNumber) {
    try {
        if (await User.isAdmin(userId)) return;
        await sessionManager.initializeSession(userId, associativeId, associativeIdOrdinalNumber);
        return;
    } catch (err) {
        throw err;
    }
}

async function concludeSession(userId, associativeId, associativeIdOrdinalNumber, isInTimeUp) {
    try {
        if (await User.isAdmin(userId)) return;
        await sessionManager.concludeSession(userId, associativeId, associativeIdOrdinalNumber, isInTimeUp);
        return;
    } catch (err) {
        throw err;
    }
}

async function saveSessionState(userId, associativeId, cursor, state, timeIndicated, progressRatio) {
    try {
        if (await User.isAdmin(userId)) return;
        await sessionManager.saveSessionState(userId, associativeId, cursor, state, timeIndicated, progressRatio);
        return;
    } catch (err) {
        throw err;
    }
}