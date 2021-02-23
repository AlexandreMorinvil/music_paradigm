const express = require('express');
const router = express.Router();
const service = require('./log.service');

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
