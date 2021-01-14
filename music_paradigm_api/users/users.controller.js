const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');

// routes
router.post('/register',            jwtAuthorize(role.admin),  register);
router.post('/assign-curriculum/:id',   jwtAuthorize(role.admin),  assignCurriculum);
router.post('/update-progression/:id',  jwtAuthorize(role.admin),  updateProgression);
router.post('/reset-progression/:id',   jwtAuthorize(role.admin),  resetProgression);
router.get('/',                     jwtAuthorize(role.admin),  getAll);
router.get('/current',                                         getCurrent);
router.get('/:id',                  jwtAuthorize(role.admin),  getById);
router.put('/:id',                  jwtAuthorize(role.admin),  update);
router.delete('/:id',               jwtAuthorize(role.admin),  _delete);

module.exports = router;

function register(req, res, next) {
    userService.create(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function assignCurriculum(req, res, next) {
    userService.assignCurriculum(req.params.id, req.body.curriculum)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function updateProgression(req, res, next) {
    userService.updateProgression(req.params.id, req.body)
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

function getAll(req, res, next) {
    userService.getAll()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}
