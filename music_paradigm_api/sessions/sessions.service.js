const sessionManager = require('sessions/session.manager');
const User = require('database/db').User;

module.exports = {
    initializeSession,
    concludeSession,
    saveSessionState,
};

async function initializeSession(userId, associativeId, associativeIdOrdinalNumber) {
    if (await User.isAdmin(userId)) return;
    return await sessionManager.initializeSession(userId, associativeId, associativeIdOrdinalNumber);
}

async function concludeSession(userId, associativeId, associativeIdOrdinalNumber, isInTimeUp, mustKeepMarkerAfterEnd) {
    if (await User.isAdmin(userId)) return;
    return await sessionManager.concludeSession(
        userId,
        associativeId,
        associativeIdOrdinalNumber,
        isInTimeUp,
        mustKeepMarkerAfterEnd
    );
}

async function saveSessionState(userId, associativeId, cursor, state, timeIndicated, progressRatio) {
    if (await User.isAdmin(userId)) return;
    return await sessionManager.saveSessionState(
        userId,
        associativeId,
        cursor,
        state,
        timeIndicated,
        progressRatio,
    );
}