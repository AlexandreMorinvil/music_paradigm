const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./experiment-markers.service');

// routes
router.post('/:progressionId/:associativeId',   jwtAuthorize(role.admin), resetTimeIndicated);
router.delete('/:progressionId/:associativeId', jwtAuthorize(role.admin), _delete);

module.exports = router;

function resetTimeIndicated(req, res, next) {

    const progressionId = req.params.progressionId;
    const associativeId = req.params.associativeId;

    service.resetTimeIndicated(progressionId, associativeId)
        .then(progressionSessionsStatus => res.status(200).json(progressionSessionsStatus))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function _delete(req, res, next) {

    const progressionId = req.params.progressionId;
    const associativeId = req.params.associativeId;
    
    service.delete(progressionId, associativeId)
        .then(progressionSessionsStatus => res.status(200).json(progressionSessionsStatus))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}