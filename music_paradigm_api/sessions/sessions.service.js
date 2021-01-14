const db = require('database/db');
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
