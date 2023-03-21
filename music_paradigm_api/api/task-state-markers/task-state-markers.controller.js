const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./task-state-markers.service');

// routes
router.post('/reset-timer/:progressionId/:associativeId',   jwtAuthorize(role.admin), resetSessionTimer);
router.delete('/delete/:progressionId/:associativeId', jwtAuthorize(role.admin), deleteTaskStateMarker);

module.exports = router;

function resetSessionTimer(req, res, next) {

    // Parameters
    const progressionId = req.params.progressionId;
    const associativeId = req.params.associativeId;

    // Processing
    service.resetSessionTimer(progressionId, associativeId)
        .then(progressionSessionsStatus => res.status(200).json(progressionSessionsStatus))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function deleteTaskStateMarker(req, res, next) {
    
    // Parameters 
    const progressionId = req.params.progressionId;
    const associativeId = req.params.associativeId;
    
    // Processing
    service.deleteTaskStateMarker(progressionId, associativeId)
        .then(progressionSessionsStatus => res.status(200).json(progressionSessionsStatus))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}