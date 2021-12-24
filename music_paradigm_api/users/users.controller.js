const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');

// routes
router.post('/register',                jwtAuthorize(role.admin), register);
router.post('/assign-curriculum/:id',   jwtAuthorize(role.admin), assignCurriculum);
router.post('/assign-parameters/:id',   jwtAuthorize(role.admin), assignParameters);
router.post('/assign-adjustments/:id',  jwtAuthorize(role.admin), assignAdjustments);
router.post('/reset-progression/:id',   jwtAuthorize(role.admin), resetProgression);
router.get('/',                         jwtAuthorize(role.admin), getAll);
router.get('/current',                                            getCurrent);
router.get('/:id',                      jwtAuthorize(role.admin), getById);
router.put('/:id',                      jwtAuthorize(role.admin), update);
router.delete('/:id',                   jwtAuthorize(role.admin), _delete);

module.exports = router;

function getAll(req, res, next) {
    userService.getAll()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getCurrent(req, res, next) {
    const userId = req.user.sub;
    userService.getById(userId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getById(req, res, next) {
    const userId = req.params.id;
    userService.getById(userId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function register(req, res, next) {
    const user = req.body.user;
    const curriculumId = req.body.curriculum;
    const assignedParameters = req.body.assignedParameters;
    userService.createUser(user, curriculumId, assignedParameters)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function update(req, res, next) {
    const userId = req.params.id;
    const userUpdated = req.body;
    userService.updateUser(userId, userUpdated)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function _delete(req, res, next) {
    const userId = req.params.id;
    userService.deleteUser(userId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function assignCurriculum(req, res, next) {
    const userId = req.params.id;
    const curriculumId = req.body.curriculum;
    const assignedParameters = req.body.assignedParameters;
    userService.assignCurriculum(userId, curriculumId, assignedParameters)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function assignParameters(req, res, next) {
    const userId = req.params.id;
    const assignedParameters = req.body.assignedParameters;
    userService.assignParameters(userId, assignedParameters)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function assignAdjustments(req, res, next) {
    const userId = req.params.id;
    const assignedAdjustments = req.body;
    userService.assignAdjustments(userId, assignedAdjustments)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function resetProgression(req, res, next) {
    userService.getById(req.params.id, req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}
