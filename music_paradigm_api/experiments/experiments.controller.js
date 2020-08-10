const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./experiments.service');

// routes
router.get('/',                 jwtAuthorize(role.admin), getListAllHeaders);
router.get('/:id',              jwtAuthorize(role.admin), getById);
router.get('/description/:id',  jwtAuthorize(role.admin), getDescription);

router.post('/',                jwtAuthorize(role.admin), create);

module.exports = router;

function getListAllHeaders(req, res, next) {
    service.getListAllHeaders()
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

function getDescription(req, res, next) {
    service.getDescriptionFromId(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function create(req, res, next) {
    service.create(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

// // routes
// router.get('/:id',      jwtAuthorize(role.admin),   getById);
// router.put('/:id',      jwtAuthorize(role.admin),   update);
// router.delete('/:id',   jwtAuthorize(role.admin),   _delete);

// module.exports = router;

// function getCurrent(req, res, next) {
//     service.getById(req.user.sub)
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