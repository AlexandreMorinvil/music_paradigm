const express = require('express');
const router = express.Router();
const usersBatchCommandsService = require('./users-batch-commands.service');
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');

// routes
router.delete('/delete-users', jwtAuthorize(role.admin), deleteUsers);

router.get('/get-template-csv', jwtAuthorize(role.admin), getUsersCreationTemplateCsv)
router.get('/get-template-csv/:curriculumId', jwtAuthorize(role.admin), getUsersCreationTemplateCsv)

router.post('/add-tag', jwtAuthorize(role.admin), addTag);
router.post('/append-to-note', jwtAuthorize(role.admin), appendToNote);
router.post('/create-users-from-csv', jwtAuthorize(role.admin), createUsersFromCsv);
router.post('/prepend-to-note', jwtAuthorize(role.admin), prependToNote);
router.post('/remove-all-tags', jwtAuthorize(role.admin), removeAllTags);
router.post('/remove-tag', jwtAuthorize(role.admin), removeTag);
router.post('/set-group', jwtAuthorize(role.admin), setGroup);
router.post('/set-note', jwtAuthorize(role.admin), setNote);
router.post('/set-password', jwtAuthorize(role.admin), setPassword);

module.exports = router;

function addTag(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];
    const tag = req.body.tag;

    // Processing
    usersBatchCommandsService.addTag(userIdsList, tag)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function appendToNote(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];
    const note = req.body.note;

    // Processing
    usersBatchCommandsService.appendToNote(userIdsList, note)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function createUsersFromCsv(req, res, next) {

    // Parameters
    const csvFile = req.body.csvFile;

    // Processing
    usersBatchCommandsService.createUsersFromCsv(csvFile)
        .then((usersCreationReportTxt) => {
            res.setHeader('Content-disposition', 'attachment; filename=users-creation-repport.txt');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'text/plain');
            res.status(200).send(usersCreationReportTxt);
        })
        .catch(err => next(err))
        .finally(() => next());
}

function deleteUsers(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];

    // Processing
    usersBatchCommandsService.deleteUsers(userIdsList)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function getUsersCreationTemplateCsv(req, res, next) {

    // Parameters
    const curriculumId = req.params.curriculumId ?? null;

    // Processing
    usersBatchCommandsService.getUsersCreationTemplateCsv(curriculumId)
        .then((csv) => {
            res.setHeader('Content-disposition', 'attachment; filename=users-creation-template.csv');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
        .catch(err => next(err))
        .finally(() => next());
}

function prependToNote(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];
    const note = req.body.note;

    // Processing
    usersBatchCommandsService.prependToNote(userIdsList, note)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function removeAllTags(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];

    // Processing
    usersBatchCommandsService.removeAllTags(userIdsList)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function removeTag(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];
    const tag = req.body.tag;

    // Processing
    usersBatchCommandsService.removeTag(userIdsList, tag)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function setGroup(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];
    const group = req.body.group;

    // Processing
    usersBatchCommandsService.setGroup(userIdsList, group)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function setNote(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];
    const note = req.body.note;

    // Processing
    usersBatchCommandsService.setNote(userIdsList, note)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}

function setPassword(req, res, next) {

    // Parameters
    const userIdsList = req.body.idsList ?? [];
    const password = req.body.password;
    const isPasswordSecret = req.body.isPasswordSecret;

    // Processing
    usersBatchCommandsService.setPassword(userIdsList, password, isPasswordSecret)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ message: error.message }))
        .finally(() => next());
}