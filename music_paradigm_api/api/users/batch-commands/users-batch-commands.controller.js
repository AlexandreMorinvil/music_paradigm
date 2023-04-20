const express = require('express');
const router = express.Router();
const usersBatchCommandsService = require('./users-batch-commands.service');
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');

// routes
router.post('/add-tag',         jwtAuthorize(role.admin), addTag);
router.post('/append-to-note',  jwtAuthorize(role.admin), appendToNote);
router.post('/prepend-to-note', jwtAuthorize(role.admin), prependToNote);
router.post('/remove-all-tags', jwtAuthorize(role.admin), removeAllTags);
router.post('/remove-tag',      jwtAuthorize(role.admin), removeTag);
router.post('/set-group',       jwtAuthorize(role.admin), setGroup);
router.post('/set-note',        jwtAuthorize(role.admin), setNote);

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