﻿const db = require('database/db');
const jwt = require('jwt/jwt');
const progressionService = require('account/progression-summary.service');
const User = db.User;

module.exports = {
    authenticate,
    getProgressionSummary,
    getTodayExperiment,
    getSpecificExperiment,
    // getListAllHeaders,
    // getById,
    // update,
    // delete: _delete
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
        const progressionSummary = await progressionService.generateProgressionSummary(userId);
        const dueExperimentAssociativeId = progressionSummary.dueExperimentAssociativeId;

        if (!dueExperimentAssociativeId) throw new Error('There is no due experiment');
        const progression = await User.getLastProgression(userId);
        const sessionInformation = await progression.getSessionInformation(dueExperimentAssociativeId);

        return sessionInformation
    } catch (err) {
        throw err;
    }
}

async function getSpecificExperiment(userId, associativeId) {
    try {
        const progressionSummary = await progressionService.generateProgressionSummary(userId);
        const history = progressionSummary.history;
        const isExperimentAvailable = history.some(value => {
            return (value.associativeId === associativeId) && (value.isAvailable)
        });
        
        if(!isExperimentAvailable) throw new Error('There experiment requested is not available');
        const progression = await User.getLastProgression(userId);
        const sessionInformation = await progression.getSessionInformation(associativeId);

        return sessionInformation
    } catch (err) {
        throw err;
    }
}
