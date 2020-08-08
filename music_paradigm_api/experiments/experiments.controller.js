﻿const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./experiments.service');

// routes
router.post('/create', jwtAuthorize(role.admin), create);

module.exports = router;

function create(req, res, next) {
    service.create(req.body)
        .then(result => result.experiment ? res.json(result) : res.status(400).json({ message: result.message }))
        .catch(err => next(err));
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