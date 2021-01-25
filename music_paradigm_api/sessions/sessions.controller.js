const express = require('express');
const router = express.Router();
const service = require('./sessions.service');

// routes
router.post('/initialize-session/:associativeId', initializeSession);
router.post('/conclude-session/:associativeId', concludeSession);

module.exports = router;

function initializeSession(req, res, next) {
    service.initializeSession(req.user.sub, req.params.associativeId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function concludeSession(req, res, next) {
    service.concludeSession(req.user.sub, req.params.associativeId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}