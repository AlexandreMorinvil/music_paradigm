const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');

// routes
router.delete('/:id',                           jwtAuthorize(role.admin), _delete);

router.get('/',                                 jwtAuthorize(role.admin), getAll);
router.get('/current',                                                    getCurrent);
router.get('/existing-groups-list',             jwtAuthorize(role.admin), getExistingUserGroupsList);
router.get('/get-by-id/:id',                    jwtAuthorize(role.admin), getById);

router.post('/create',                          jwtAuthorize(role.admin), createUser);
router.post('/create-with-curriculum',          jwtAuthorize(role.admin), createUserWithCurriculum);

router.put('/:id',                              jwtAuthorize(role.admin), updateUserProfile);


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

function getExistingUserGroupsList(req, res, next) {
    userService.getExistingUserGroupsList()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function createUser(req, res, next) {

    // Parameters
    const user = req.body.user;

    // Processing
    userService.createUser(user)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function createUserWithCurriculum(req, res, next) {

    // Parameters
    const user = req.body.user;
    const assignedParameters = req.body.assignedParameters;

    // Processing
    userService.createUser(user, assignedParameters)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function updateUserProfile(req, res, next) {

    // Parameters
    const userId = req.params.id;
    const userUpdated = req.body;
    
    // Processing
    userService.updateUserProfile(userId, userUpdated)
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
