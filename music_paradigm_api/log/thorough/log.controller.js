const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./log.service');

// routes
router.post('/initialize-log', initializeLog);
router.patch('/add-log-block', addLogBlock);
router.patch('/conclude-log',  concludeLog);

// Those queries are defined as POST instead of GET as GET request doesn't usually have a 'body'
router.post('/user-summary-list',   jwtAuthorize(role.admin), getUserLogSummaryList);
router.post('/admin-summary-list',  jwtAuthorize(role.admin), getAdminLogSummaryList);

router.post('/admin-csv',       jwtAuthorize(role.admin), makeAdminLogCsv);
router.post('/user-csv',        jwtAuthorize(role.admin), makeUserLogCsv);

module.exports = router;

function initializeLog(req, res, next) {

    const userId = req.user.sub;
    const logHeader = req.body.logHeader;

    service.initializeLog(userId, logHeader)
        .then((logId) => res.status(200).json(logId))
        .catch(err => next(err));
}


function addLogBlock(req, res, next) {

    const userId = req.user.sub;
    const logHeader = req.body.logHeader;
    const block = req.body.block;

    service.addLogBlock(userId, logHeader, block)
        .then((logId) => res.status(200).json(logId))
        .catch(err => next(err));
}

function concludeLog(req, res, next) {

    const userId = req.user.sub;
    const logHeader = req.body.logHeader;
    const logConclusion = req.body.logConclusion;

    service.concludeLog(userId, logHeader, logConclusion)
        .then((logId) => res.status(200).json(logId))
        .catch(err => next(err));
}

function getUserLogSummaryList(req, res, next) {

    const criterias = req.body;

    service.getUserLogSummaryList(criterias)
        .then((list) => res.status(200).json(list))
        .catch(err => next(err));
}

function getAdminLogSummaryList(req, res, next) {

    const criterias = req.body;

    service.getAdminLogSummaryList(criterias)
        .then((list) => res.status(200).json(list))
        .catch(err => next(err));
}

function makeUserLogCsv(req, res, next) {

    const criterias = req.body;

    service.makeUserLogCsv(criterias)
        .then((csv) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
        .catch(err => next(err));
}

function makeAdminLogCsv(req, res, next) {

    const criterias = req.body;

    service.makeAdminLogCsv(criterias)
        .then((csv) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
        .catch(err => next(err));
}
