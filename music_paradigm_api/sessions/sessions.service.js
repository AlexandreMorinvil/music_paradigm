const db = require('database/db');
const User = db.User;

module.exports = {
    initializeSession,
    concludeSession,
    saveSessionState,
    forgetSessionState
};

async function initializeSession(userId, associativeId) {
    try {
        if (!userId || !associativeId || associativeId === 'null') return;
        const progression = await User.getLastProgression(userId);
        await progression.initializeExperiment(associativeId);
        return;
    } catch (err) {
        throw err;
    }
}

async function concludeSession(userId, associativeId) {
    try {
        const progression = await User.getLastProgression(userId);
        await progression.concludeExperiment(associativeId);
        return;
    } catch (err) {
        throw err;
    }
}

async function saveSessionState(userId, associativeId, cursor, state) {
    try {
        if (!userId || !associativeId || associativeId === 'null') return;
        const progression = await User.getLastProgression(userId);
        await progression.saveSessionState(associativeId, cursor, state);
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
