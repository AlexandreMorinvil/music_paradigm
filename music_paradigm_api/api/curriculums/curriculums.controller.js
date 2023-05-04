const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const curriculumService = require('./curriculums.service');

// routes
router.delete('/:id',           jwtAuthorize(role.admin),  deleteCurriculum);


router.get('/get-by-id/:id',    jwtAuthorize(role.admin),  getCurriculumById);
router.get('/',                 jwtAuthorize(role.admin),  getCurriculumSummariesList);

router.post('/',                jwtAuthorize(role.admin),  createCurriculum);

router.put('/:id',              jwtAuthorize(role.admin),  updateCurriculum);

module.exports = router;

function createCurriculum(req, res, next) {
    curriculumService.createCurriculum(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function deleteCurriculum(req, res, next) {
    curriculumService.deleteCurriculum(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getCurriculumSummariesList(req, res, next) {
    curriculumService.getCurriculumSummariesList()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getCurriculumById(req, res, next) {
    curriculumService.getCurriculumById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function updateCurriculum(req, res, next) {
    curriculumService.updateCurriculum(req.params.id, req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}