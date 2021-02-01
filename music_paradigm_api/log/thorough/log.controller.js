const express = require('express');
const router = express.Router();
const service = require('./log.service');

// routes
router.post('/initialize-log', initializeLog);
router.patch('/add-log-block/:logId', addLogBlock);
router.post('/conclude-log/:logId', concludeLog);

module.exports = router;

function initializeLog(req, res, next) {
    service.initializeLog(req.user.sub, req.body)
        .then((logId) => res.json(logId))
        .catch(err => next(err));
}


function addLogBlock(req, res, next) {
    service.addLogBlock(req.user.sub, req.params.logId, req.body)
        .then(() => res.status(200))
        .catch(err => next(err));
}

function concludeLog(req, res, next) {
    service.concludeLog(req.user.sub, req.params.logId, req.body)
        .then(() => res.status(200))
        .catch(err => next(err));
}