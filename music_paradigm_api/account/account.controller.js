const express = require('express');
const router = express.Router();
const accountService = require('./account.service');

// routes
router.post('/authenticate', authenticate);
router.get('/progression-summary', getProressionSummary);
router.get('/due-experiment', getTodayExperiment);
router.get('/specific-experiment/:associativeId/:associativeIdOrdinalNumber', getSpecificExperiment);

module.exports = router;

function authenticate(req, res, next) {
    accountService.authenticate(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getProressionSummary(req, res, next) {
    accountService.getProgressionSummary(req.user.sub)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getTodayExperiment(req, res, next) {
    accountService.getTodayExperiment(req.user.sub)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getSpecificExperiment(req, res, next) {
    const userId = req.user.sub;
    const associativeId = req.params.associativeId;
    const associativeIdOrdinalNumber = Number(req.params.associativeIdOrdinalNumber);
    
    accountService.getSpecificExperiment(userId, associativeId, associativeIdOrdinalNumber)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}
