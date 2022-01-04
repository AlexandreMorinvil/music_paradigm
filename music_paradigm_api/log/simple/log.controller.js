const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./log.service');

// routes
router.post('/add-block', addBlock);

router.get('/user-select-by-id/:logId',    jwtAuthorize(role.admin), getOneUserLogFromId);
router.get('/admin-select-by-id/:logId',   jwtAuthorize(role.admin), getOneAdminLogFromId);

// Those queries are defined as POST instead of GET as GET request doesn't usually have a 'body' 
router.post('/user-summary-list',   jwtAuthorize(role.admin), getUserLogSummaryList);
router.post('/admin-summary-list',  jwtAuthorize(role.admin), getAdminLogSummaryList);

router.post('/user-csv',            jwtAuthorize(role.admin), makeUserLogCsv);
router.post('/admin-csv',           jwtAuthorize(role.admin), makeAdminLogCsv);

router.post('/user-json',           jwtAuthorize(role.admin), makeUserLogJson);
router.post('/admin-json',          jwtAuthorize(role.admin), makeAdminLogJson);

module.exports = router;

function addBlock(req, res, next) {

    const userId = req.user.sub;
    const block = req.body.block || req.body;

    service.addBlock(userId, block)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getOneUserLogFromId(req, res, next) {

    const logId = req.params.logId;

    service.getOneUserLogFromId(logId)
        .then((list) => res.status(200).json(list))
        .catch(err => next(err));
}

function getOneAdminLogFromId(req, res, next) {

    const logId = req.params.logId;

    service.getOneAdminLogFromId(logId)
        .then((log) => res.status(200).json(log))
        .catch(err => next(err));
}

function getUserLogSummaryList(req, res, next) {

    const criterias = req.body;

    service.getUserLogSummaryList(criterias)
        .then((log) => res.status(200).json(log))
        .catch(err => next(err));
}

function getAdminLogSummaryList(req, res, next) {

    const criterias = req.body;

    service.getAdminLogSummaryList(criterias)
        .then((list) => res.status(200).json(list))
        .catch(err => next(err));
}

function makeUserLogCsv(req, res, next) {

    const query = req.body;

    service.makeUserLogCsv(query)
        .then((csv) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
        .catch(err => next(err));
}

function makeAdminLogCsv(req, res, next) {

    const query = req.body;
    
    service.makeAdminLogCsv(query)
        .then((csv) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
        .catch(err => next(err));
}

function makeUserLogJson(req, res, next) {

    const query = req.body;

    service.makeUserLogJson(query)
        .then((json) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.json');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'text/json');
            res.status(200).send(json);
        })
        .catch(err => next(err));
}

function makeAdminLogJson(req, res, next) {

    const query = req.body;
    
    service.makeAdminLogJson(query)
        .then((json) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.json');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'text/json');
            res.status(200).send(json);
        })
        .catch(err => next(err));
}
