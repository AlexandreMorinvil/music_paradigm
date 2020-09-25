const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const curriculumService = require('./curriculums.service');

// routes
router.post('/',                jwtAuthorize(role.admin),  create);
router.get('/',                 jwtAuthorize(role.admin),  getListAllHeaders);
// router.get('/current',                                     getCurrent);
router.get('/:id',              jwtAuthorize(role.admin),  getById);
// router.put('/:id',              jwtAuthorize(role.admin),  update);
// router.delete('/:id',           jwtAuthorize(role.admin),  _delete);

module.exports = router;

function create(req, res, next) {
    curriculumService.create(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getListAllHeaders(req, res, next) {
    curriculumService.getListAllHeaders()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

// function getCurrent(req, res, next) {
//     curriculumService.getById(req.user.sub)
//         .then(result => res.status(200).json(result))
//         .catch(error => res.status(400).json({ message: error.message }))
//         .finally(() => next());
// }

function getById(req, res, next) {
    curriculumService.getById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

// function update(req, res, next) {
//     curriculumService.update(req.params.id, req.body)
//         .then(result => res.status(200).json(result))
//         .catch(error => res.status(400).json({ message: error.message }))
//         .finally(() => next());
// }

// function _delete(req, res, next) {
//     curriculumService.delete(req.params.id)
//         .then(result => res.status(200).json(result))
//         .catch(error => res.status(400).json({ message: error.message }))
//         .finally(() => next());
// }