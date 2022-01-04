const AdminLogSimple = require('database/db').AdminLogSimple;
const LogSimple = require('database/db').LogSimple;
const User = require('database/db').User;

const csvConverter = require('_helpers/csv-converter');
const jsonConverter = require('_helpers/json-converter');
const { makeMongooseLogQuery } = require('log/log-query-maker.service')

// Exports
module.exports = {
    addBlock,
    getOneUserLogFromId,
    getOneAdminLogFromId,
    getUserLogSummaryList,
    getAdminLogSummaryList,
    makeUserLogCsv,
    makeAdminLogCsv,
    makeUserLogJson,
    makeAdminLogJson,
};

async function addBlock(userId, block) {
    try {
        let addedBlock = null;
        if (await User.isAdmin(userId)) addedBlock = await AdminLogSimple.addBlock(block);
        else  addedBlock = await LogSimple.addBlock(block);
        return addedBlock;
    } catch (err) {
        throw err;
    }
}

async function getOneUserLogFromId(logId) {
    try {
        let data = await LogSimple.getOneLogFromId(logId);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}

async function getOneAdminLogFromId(logId) {
    try {
        let data = await AdminLogSimple.getOneLogFromId(logId);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}

async function getUserLogSummaryList(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        return await LogSimple.makeSummaryList(query);
    } catch (err) {
        throw err;
    }
}

async function getAdminLogSummaryList(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        return await AdminLogSimple.makeSummaryList(query);
    } catch (err) {
        throw err;
    }
}

async function makeUserLogCsv(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await LogSimple.getFileRelevantData(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}

async function makeAdminLogCsv(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await AdminLogSimple.getFileRelevantData(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}

async function makeUserLogJson(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await LogSimple.getFileRelevantData(query);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}

async function makeAdminLogJson(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await AdminLogSimple.getFileRelevantData(query);
        return jsonConverter.makeJson(data);
    } catch (err) {
        throw err;
    }
}