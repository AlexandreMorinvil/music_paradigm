const db = require('database/db');
const jwt = require('jwt/jwt');
const progressionService = require('progression/progression-summary.service');
const User = db.User;

module.exports = {
    authenticate,
    getProgressionSummary,
    getTodayExperiment,
    getSpecificExperiment,
};

async function authenticate({ username, password }) {
    try {
        const userWithoutPassword = await User.authenticate(username, password);
        await progressionService.updateProgression(userWithoutPassword._id.toString());
        const token = jwt.generateToken(userWithoutPassword);

        return {
            ...userWithoutPassword,
            token
        };
    } catch (err) {
        if (!err.message)
            throw new Error("Användarnamn eller lösenord felaktigt");
        else
            throw err;
    }
}

async function getProgressionSummary(userId) {
    try {
        return await progressionService.generateProgressionSummary(userId);
    } catch (err) {
        throw err;
    }
}

async function getTodayExperiment(userId) {
    try {
        const { dueExperiment } = await progressionService.generateProgressionSummary(userId);
        const { associativeId, associativeIdOrdinalNumber } = dueExperiment;

        if (!associativeId) throw new Error('There is no due experiment');
        const progression = await User.getLastProgression(userId);
        const sessionInformation = await progression.getSessionInformation(associativeId, associativeIdOrdinalNumber);

        return sessionInformation
    } catch (err) {
        throw err;
    }
}

async function getSpecificExperiment(userId, associativeId, associativeIdOrdinalNumber) {
    try {
        const progressionSummary = await progressionService.generateProgressionSummary(userId);
        const history = progressionSummary.history;
        const isExperimentAvailable = history.some(value => {
            return (
                value.associativeId === associativeId) &&
                (value.associativeIdOrdinalNumber === associativeIdOrdinalNumber) &&
                (value.isAvailable)
        });

        if (!isExperimentAvailable) throw new Error('There experiment requested is not available');
        const progression = await User.getLastProgression(userId);
        const sessionInformation = await progression.getSessionInformation(associativeId, associativeIdOrdinalNumber);

        return sessionInformation
    } catch (err) {
        throw err;
    }
}
