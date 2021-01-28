const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./log.service');

// routes
// router.post('/create-simple',    jwtAuthorize(role.admin),   createSimpleLog);
// router.post('/create',          jwtAuthorize(role.admin),   initialize);
// router.patch('/add-block/:id',  jwtAuthorize(role.admin),   addBlock);

router.post('/initialize-log',    jwtAuthorize(role.admin),   initializeLog);

module.exports = router;

// function createSimpleLog(req, res, next) {
//     service.createSimpleLog(req.body)
//         .then((createdSession) => res.json(createdSession))
//         .catch(err => next(err));
// }

// function initialize(req, res, next) {
//     service.initialize(req.body)
//         .then((createdSession) => res.json(createdSession))
//         .catch(err => next(err));
// }

// function addBlock(req, res, next) {
//     service.addBlock(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

function initializeLog(req, res, next) {
    service.initializeLog(req.user.sub, req.body)
        .then((createdSession) => res.json(createdSession))
        .catch(err => next(err));
}