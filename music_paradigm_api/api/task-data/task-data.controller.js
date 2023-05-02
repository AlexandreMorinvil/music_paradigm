const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./task-data.service');

const { makeMongooseTaskDataQuery } = require('modules/task-data/task-data-query-maker')

// routes
router.post('/download-csv',        jwtAuthorize(role.admin), downloadTaskDataCsv);
router.post('/download-json',       jwtAuthorize(role.admin), downloadTaskDataJson);
router.post('/get-summaries-list',  jwtAuthorize(role.admin), getTaskDataSummariesList);

module.exports = router;

function downloadTaskDataCsv(req, res, next) {

    // Parameters
    const query = makeMongooseTaskDataQuery(req.body.criteria ?? {});

    // Processing
    service.downloadTaskDataCsv(query)
        .then((csv) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        })
        .catch(err => next(err))
        .finally(() => next());
}

function downloadTaskDataJson(req, res, next) {

    // Parameters
    const query = makeMongooseTaskDataQuery(req.body.criteria ?? {});

    // Processing
    service.downloadTaskDataJson(query)
        .then((json) => {
            res.setHeader('Content-disposition', 'attachment; filename=data.json');
            res.set('Access-Control-Expose-Headers', 'Content-Disposition');
            res.set('Content-Type', 'application/json');
            res.status(200).send(json);
        })
        .catch(err => next(err))
        .finally(() => next());
}

function getTaskDataSummariesList(req, res, next) {

    // Parameters
    const query = makeMongooseTaskDataQuery(req.body.criteria ?? {});

    // Processing
    service.getTaskDataSummariesList(query)
        .then((result) => res.status(200).json(result))
        .catch(err => next(err))
        .finally(() => next());
}