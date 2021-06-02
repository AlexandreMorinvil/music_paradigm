const db = require('database/db');
const User = db.User;

module.exports = {
    initializeSession,
    concludeSession,
    saveSessionState,
    forgetSessionState
};

async function initializeSession(userId, associativeId, associativeIdOrdinalNumber) {
    try {
        if (!userId || !associativeId || associativeId === 'null') return;
        const progression = await User.getLastProgression(userId);
        await progression.initializeExperiment(associativeId, associativeIdOrdinalNumber);
        return;
    } catch (err) {
        throw err;
    }
}

async function concludeSession(userId, associativeId, associativeIdOrdinalNumber, isInTimeUp) {
    try {
        const progression = await User.getLastProgression(userId);
        await progression.concludeExperiment(associativeId, associativeIdOrdinalNumber, isInTimeUp);
        return;
    } catch (err) {
        throw err;
    }
}

async function saveSessionState(userId, associativeId, cursor, state, timeIndicated) {
    try {
        if (!userId || !associativeId || associativeId === 'null') return;
        const progression = await User.getLastProgression(userId);
        await progression.saveSessionState(associativeId, cursor, state, timeIndicated);
        return;
    } catch (err) {
        throw err;
    }
}

async function forgetSessionState(userId, associativeId) {
    try {
        if (!userId || !associativeId || associativeId === 'null') return;
        const progression = await User.getLastProgression(userId);
        await progression.forgetSessionState(associativeId);
        return;
    } catch (err) {
        throw err;
    }
}
