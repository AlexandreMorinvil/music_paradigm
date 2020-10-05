const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const accountService = require('./account.service');

// routes
router.post('/authenticate', authenticate);
router.get('/todayExperiment', getTodayExperiment);
// router.post('/',                jwtAuthorize(role.admin),  create);
// router.get('/',                 jwtAuthorize(role.admin),  getListAllHeaders);
// router.get('/:id',              jwtAuthorize(role.admin),  getById);
// router.put('/:id',              jwtAuthorize(role.admin),  update);
// router.delete('/:id',           jwtAuthorize(role.admin),  _delete);

module.exports = router;

function authenticate(req, res, next) {
    accountService.authenticate(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getTodayExperiment(req, res, next) {
    accountService.getTodayExperiment(req.user.sub)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

// function create(req, res, next) {
//     curriculumService.create(req.body)
//         .then(result => res.status(200).json(result))
//         .catch(error => res.status(400).json({ message: error.message }))
//         .finally(() => next());
// }

// function getListAllHeaders(req, res, next) {
//     curriculumService.getListAllHeaders()
//         .then(result => res.status(200).json(result))
//         .catch(error => res.status(400).json({ message: error.message }))
//         .finally(() => next());
// }


// function getById(req, res, next) {
//     curriculumService.getById(req.params.id)
//         .then(result => res.status(200).json(result))
//         .catch(error => res.status(400).json({ message: error.message }))
//         .finally(() => next());
// }

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