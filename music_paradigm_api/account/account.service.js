const db = require('database/db');
const jwt = require('jwt/jwt');
const progressionSummaryService = require('modules/progressions/progressions-summary.service');
const progressionValidatorService = require('modules/progressions/progressions-validator.service');
const sessionManager = require('sessions/session.manager');
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
        const token = jwt.generateToken(userWithoutPassword);
        return {
            ...userWithoutPassword,
            token
        };
    } catch (err) {
        if (!err.message)
            throw new Error("Username or password is incorrect");
        else
            throw err;
    }
}

async function getProgressionSummary(userId) {
    try {
        return await progressionSummaryService.generateProgressionSummaryForUserId(userId);
    } catch (err) {
        throw err;
    }
}

async function getTodayExperiment(userId) {
    try {
        const { dueExperiment } = await progressionSummaryService.generateProgressionSummaryForUserId(userId);
        const { associativeId, associativeIdOrdinalNumber } = dueExperiment;
        if (!associativeId) throw new Error('There is no due experiment');

        return await sessionManager.getSessionInformation(userId, associativeId, associativeIdOrdinalNumber);
    } catch (err) {
        throw err;
    }
}

async function getSpecificExperiment(userId, associativeId, associativeIdOrdinalNumber) {
    try {
        const { history } = await progressionSummaryService.generateProgressionSummaryForUserId(userId, associativeId, associativeIdOrdinalNumber);
        const isExperimentAvailable = progressionValidatorService.isExperimentAvailable(history, associativeId, associativeIdOrdinalNumber)
        if (!isExperimentAvailable) throw new Error('There experiment requested is not available');

        return await sessionManager.getSessionInformation(userId, associativeId, associativeIdOrdinalNumber);
    } catch (err) {
        throw err;
    }
}
