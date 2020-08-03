﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const jwtAuthorize = require('jwt/jwt.authorization');
const timeout = require('_helpers/timeout')
const role = require('_helpers/role');

// routes
router.post('/authenticate',                               authenticate);
router.post('/register',        jwtAuthorize(role.admin),  register);
router.get('/',                 jwtAuthorize(role.admin),  getAll);
router.get('/current',                                     getCurrent);
router.get('/:id',              jwtAuthorize(role.admin),  getById);
router.put('/:id',              jwtAuthorize(role.admin),  update);
router.delete('/:id',           jwtAuthorize(role.admin),  _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}