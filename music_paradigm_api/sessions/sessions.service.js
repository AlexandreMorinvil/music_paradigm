const db = require('database/db');
const jwt = require('jwt/jwt');
const progressionService = require('account/progression-summary.service');
const Progression = db.Progression;
const User = db.User;

module.exports = {
    concludeExperiment
};


async function concludeExperiment(userId, associativeId) {
    try {
        const progression = await User.getLastProgression(userId);
        await progression.concludeExperiment(associativeId);
        return;
    } catch (err) {
        throw err;
    }
}
