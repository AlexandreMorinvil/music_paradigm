const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./log.service');

router.get('/user-summary-list/:userId/:progressionId?/:associativeId?', jwtAuthorize(role.admin), getUserLogSummaryList);

router.post('/admin-log-csv', jwtAuthorize(role.admin), makeAdminLogCsv);
router.post('/user-log-csv', jwtAuthorize(role.admin), makeUserLogCsv);

// routes
router.post('/add-block', addBlock);

module.exports = router;

function addBlock(req, res, next) {

    const userId = req.user.sub;
    const block = req.body.block || req.body;

    service.addBlock(userId, block)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getUserLogSummaryList(req, res, next) {

    const userId = req.params.userId;
    const progressionId = req.params.progressionId;
    const associativeId = req.params.associativeId;

    service.getUserLogSummaryList(userId, progressionId, associativeId)
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
