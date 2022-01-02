const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./log.service');

// routes
router.post('/add-block', addBlock);

// Those queries are defined as POST instead of GET as GET request doesn't usually have a 'body' 
router.post('/admin-summary-list',  jwtAuthorize(role.admin), getAdminLogSummaryList);
router.post('/user-summary-list',   jwtAuthorize(role.admin), getUserLogSummaryList);

router.post('/admin-csv',       jwtAuthorize(role.admin), makeAdminLogCsv);
router.post('/user-csv',        jwtAuthorize(role.admin), makeUserLogCsv);

module.exports = router;

function addBlock(req, res, next) {

    const userId = req.user.sub;
    const block = req.body.block || req.body;

    service.addBlock(userId, block)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAdminLogSummaryList(req, res, next) {

    const userId = req.params.userId;
    const progressionId = req.params.progressionId;
    const associativeId = req.params.associativeId;

    service.getUserLogSummaryList(userId, progressionId, associativeId)
        .then((list) => res.status(200).json(list))
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

    const query = req.body;

    service.makeUserLogCsv(query)
        .then((csv) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
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
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
        .catch(err => next(err));
}
