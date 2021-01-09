const express = require('express');
const router = express.Router();
const service = require('./sessions.service');

// routes
router.post('/conclude-experiment/:associativeId', concludeExperiment);

module.exports = router;

function concludeExperiment(req, res, next) {
    service.concludeExperiment(req.user.sub, req.params.associativeId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}