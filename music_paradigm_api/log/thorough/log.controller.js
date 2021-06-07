const express = require('express');
const router = express.Router();
const service = require('./log.service');

// routes
router.post('/initialize-log', initializeLog);
router.patch('/add-log-block', addLogBlock);
router.patch('/conclude-log', concludeLog);

module.exports = router;

function initializeLog(req, res, next) {
    const userId = req.user.sub;
    const logHeader = req.body.logHeader;

    service.initializeLog(userId, logHeader)
        .then((logId) => res.status(200).json(logId))
        .catch(err => next(err));
}


function addLogBlock(req, res, next) {
    const userId = req.user.sub;
    const logHeader = req.body.logHeader;
    const block = req.body.block;

    service.addLogBlock(userId, logHeader, block)
        .then((logId) => res.status(200).json(logId))
        .catch(err => next(err));
}

function concludeLog(req, res, next) {
    const userId = req.user.sub;
    const logHeader = req.body.logHeader;
    const logConclusion = req.body.logConclusion;

    service.concludeLog(userId, logHeader, logConclusion)
        .then((logId) => res.status(200).json(logId))
        .catch(err => next(err));
}