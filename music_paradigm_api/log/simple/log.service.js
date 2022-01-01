const AdminLogSimple = require('database/db').AdminLogSimple;
const LogSimple = require('database/db').LogSimple;
const User = require('database/db').User;

const csvConverter = require('_helpers/csv-converter');
const { makeMongooseLogQuery } = require('log/log-query-maker.service')

// Exports
module.exports = {
    addBlock,
    getUserLogSummaryList,
    getAdminLogSummaryList,
    makeUserLogCsv,
    makeAdminLogCsv,
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


async function getUserLogSummaryList(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        return await LogThorough.makeSummaryList(query);
    } catch (err) {
        throw err;
    }
}

async function getAdminLogSummaryList(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        return await AdminLogThorough.makeSummaryList(query);
    } catch (err) {
        throw err;
    }
}

async function makeUserLogCsv(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await LogThorough.find(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}

async function makeAdminLogCsv(criterias) {
    try {
        const query = makeMongooseLogQuery(criterias);
        let data = await AdminLogThorough.find(query);
        return csvConverter.makeCsv(data);
    } catch (err) {
        throw err;
    }
}