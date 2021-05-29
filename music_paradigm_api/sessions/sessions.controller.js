const express = require('express');
const router = express.Router();
const service = require('./sessions.service');

// routes
router.post('/initialize-session/:associativeId', initializeSession);
router.post('/conclude-session/:associativeId', concludeSession);

router.post('/save-session-state/:associativeId', saveSessionState);
router.post('/forget-session-state/:associativeId', forgetSessionState);

module.exports = router;

function initializeSession(req, res, next) {
    service.initializeSession(req.user.sub, req.params.associativeId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function concludeSession(req, res, next) {
    const userId = req.user.sub;
    const associativeId = req.params.associativeId;
    const isInTimeUp = req.body.isInTimeUp;
    service.concludeSession(userId, associativeId, isInTimeUp)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function saveSessionState(req, res, next) {
    const userId = req.user.sub;
    const associativeId = req.params.associativeId;
    const cursor = req.body.cursor;
    const state = req.body.state;

    service.saveSessionState(userId, associativeId, cursor, state)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function forgetSessionState(req, res, next) {
    const userId = req.user.sub;
    const associativeId = req.params.associativeId;

    service.forgetSessionState(userId, associativeId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}