const mongoose = require('mongoose');
schema = require('./log-thorough.schema');

schema.set('toJSON', { virtuals: true });

const irrelevantFields = [
    'id',
    '__v',
    'endTimestamp._id'
];
const irrelevantFieldsWithMinus = irrelevantFields.map((field) => { return '-' + field })

// Static methods
schema.statics.initializeLog = async function (logHeader) {
    const thoroughLog = await this.findOrCreate(logHeader);
    return await thoroughLog.save();
}

schema.statics.addLogBlock = async function (logHeader, block) {
    const thoroughLog = await this.findOrCreate(logHeader);
    thoroughLog.blocks.push(block);
    return thoroughLog.save();
};

schema.statics.concludeLog = async function (logHeader, logConclusion) {
    const thoroughLog = await this.findOrCreate(logHeader);
    thoroughLog.endTimestamp.push(logConclusion);
    return thoroughLog.save();
};

schema.statics.findOrCreate = async function (logHeader) {
    const logReference = makeLogReference(logHeader);
    let thoroughLog = await this.findOne(logReference)
    if (!thoroughLog) thoroughLog = new this(logHeader);
    return thoroughLog;
}

schema.statics.makeSummaryList = async function (query) {
    const fieldToRemove = [
        '-blocks'
    ];
    return this.find(query, fieldToRemove);
}

schema.statics.getFileRelevantData = async function (query) {
    return this.find(query, irrelevantFieldsWithMinus);
}

schema.statics.getFileRelevantDataUnwound = async function (query) {
    return this.
        aggregate(
            [
                { $match: query },
                { $unset: irrelevantFields },
                { $unwind: { path: "$blocks", preserveNullAndEmptyArrays: true } }
            ])
}

schema.statics.getOneLogFromId = async function (logId) {
    return this.findById(logId, irrelevantFieldsWithMinus);
}

// Helper functions
function makeLogReference(logHeader) {
    const {
        progressionId,
        associativeId,
        logLabel,
        completionCount
    } = logHeader;

    return {
        progressionId: progressionId,
        associativeId: associativeId,
        logLabel: logLabel,
        completionCount: completionCount,
    }
}

// Creating the model
const model = mongoose.model('Log-Thorough', schema);
const adminModel = mongoose.model('Admin-Log-Thorough', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}