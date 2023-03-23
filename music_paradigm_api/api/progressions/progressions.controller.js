const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const progressionsService = require('./progressions.service');

const ProgressionSessionIdentifier = require('modules/progressions/class/progression-session-identifier.class');

// routes
router.get('/get-by-id/:progressionId',                     jwtAuthorize(role.admin), getProgressionById);

router.post('/assign-curriculum/',                          jwtAuthorize(role.admin), assignCurriculum);
router.post('/assign-parameters/:progressionId',            jwtAuthorize(role.admin), assignParameters);
router.post('/assign-session-adjustments/:progressionId',   jwtAuthorize(role.admin), assignSessionAdjustments);

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
    const progressionId = req.params.progressionId;
    const assignedParameters = req.body.assignedParameters;

    // Processing
    progressionsService.assignParameters(progressionId, assignedParameters)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function assignSessionAdjustments(req, res, next) {

    // Parameters
    const progressionId = req.params.progressionId;
    const sessionIdentifier = new ProgressionSessionIdentifier(req.body.sessionIdentifier); 
    const adjustments = req.body.adjustments;

    // Processing
    progressionsService.assignSessionAdjustments(progressionId, sessionIdentifier, adjustments)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getProgressionById(req, res, next) {

    // Parameters
    const progressionId = req.params.progressionId;

    // Processing
    progressionsService.getProgressionById(progressionId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}