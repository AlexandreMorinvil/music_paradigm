const User = require('database/db').User;

const jwt = require('jwt/jwt');
const progressionValidatorService = require('modules/progressions/progressions-validator.service');
const sessionManager = require('sessions/session.manager');
const {
    generateProgressionSessionsStatusForUserId,
} = require('modules/progressions/progression-sessions-status');

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
        return await generateProgressionSessionsStatusForUserId(userId);
    } catch (err) {
        throw err;
    }
}

async function getTodayExperiment(userId) {
    try {
        const { dueExperiment } = await generateProgressionSessionsStatusForUserId(userId);
        const { associativeId, associativeIdOrdinalNumber } = dueExperiment;
        if (!associativeId) throw new Error('There is no due session');

        return await sessionManager.getSessionInformation(userId, associativeId, associativeIdOrdinalNumber);
    } catch (err) {
        throw err;
    }
}

async function getSpecificExperiment(userId, associativeId, associativeIdOrdinalNumber) {
    try {
        const { history } = await generateProgressionSessionsStatusForUserId(userId, associativeId, associativeIdOrdinalNumber);
        const isExperimentAvailable = progressionValidatorService.isExperimentAvailable(history, associativeId, associativeIdOrdinalNumber)
        if (!isExperimentAvailable) throw new Error('The session requested is not available');

        return await sessionManager.getSessionInformation(userId, associativeId, associativeIdOrdinalNumber);
    } catch (err) {
        throw err;
    }
}
