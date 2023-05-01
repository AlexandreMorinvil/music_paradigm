const express = require('express');
const router = express.Router();
const jwtAuthorize = require('jwt/jwt.authorization');
const role = require('_helpers/role');
const service = require('./task-data.service');

const { makeMongooseTaskDataQuery } = require('modules/task-data/task-data-query-maker')

// routes
router.post('/get-summaries-list', jwtAuthorize(role.admin), getTaskDataSummariesList);

module.exports = router;

function getTaskDataSummariesList(req, res, next) {

    // Parameters
    const query = makeMongooseTaskDataQuery(req.body.criteria ?? {});

    // Processing
    service.getTaskDataSummariesList(query)
        .then((result) => res.status(200).json(result))
        .catch(err => next(err))
        .finally(() => next());
}