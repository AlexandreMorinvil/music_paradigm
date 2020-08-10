const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./experiments.service');

// routes
router.post('/create',          jwtAuthorize(role.admin), create);
router.get('/',                 jwtAuthorize(role.admin), getAll);
router.get('/:id',              jwtAuthorize(role.admin), getById);
router.get('/listHeaders',      jwtAuthorize(role.admin), getListAllHeaders);
router.get('/description/:id',  jwtAuthorize(role.admin), getDescription);

module.exports = router;

function create(req, res, next) {
    service.create(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getAll(req, res, next) {
    service.getAll()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getById(req, res, next) {
    service.getById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getListAllHeaders(req, res, next) {
    service.getListAllHeaders()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getDescription(req, res, next) {
    service.getDescriptionFromId(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

// // routes
// router.post('/create',                              create);
// router.get('/',         jwtAuthorize(role.admin),   getAll);
// router.get('/current',                              getCurrent);
// router.get('/:id',      jwtAuthorize(role.admin),   getById);
// router.put('/:id',      jwtAuthorize(role.admin),   update);
// router.delete('/:id',   jwtAuthorize(role.admin),   _delete);

// module.exports = router;

// function create(req, res, next) {
//     service.create(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function getAll(req, res, next) {
//     service.getAll()
//         .then(users => res.json(users))
//         .catch(err => next(err));
// }

// function getCurrent(req, res, next) {
//     service.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function getById(req, res, next) {
//     service.getById(req.params.id)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function update(req, res, next) {
//     service.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     service.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }