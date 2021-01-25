const db = require('database/db');
const User = db.User;

module.exports = {
    initializeSession,
    concludeSession,
};

async function initializeSession(userId, associativeId) {
    try {
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
