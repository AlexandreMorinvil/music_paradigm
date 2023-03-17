const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const progressionsService = require('./progressions.service');

// routes
router.post('/assign-curriculum/',                  jwtAuthorize(role.admin), assignCurriculum);
router.post('/assign-parameters/:progressionId',    jwtAuthorize(role.admin), assignParameters);
router.post('/assign-adjustments/:progressionId',   jwtAuthorize(role.admin), assignAdjustments);

module.exports = router;

function assignCurriculum(req, res, next) {

    // Parameters
    const userReference = req.body.userId;
    const curriculumReference = req.body.curriculumId;
    const assignedParameters = req.body.assignedParameters;

    // Processing
    progressionsService.assignCurriculum(userReference, curriculumReference, assignedParameters)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function assignParameters(req, res, next) {

    // Parameters
    const userId = req.params.id;
    const assignedParameters = req.body.assignedParameters;

    // Processing
    progressionsService.assignParameters(userId, assignedParameters)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function assignAdjustments(req, res, next) {

    // Parameters
    const userId = req.params.id;
    const assignedAdjustments = req.body;

    // Processing
    progressionsService.assignAdjustments(userId, assignedAdjustments)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}