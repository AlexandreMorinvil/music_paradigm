const mongoose = require('mongoose');
schema = require('./log-simple.schema');

schema.set('toJSON', { virtuals: true });

const irrelevantFieldsForScientist = [
    '-id',
    '-__v',
    '-updatedAt',
    // '-_id',
    // '-userId',
    // '-experimentId',
    // '-progressionId',
    // '-curriculumId',
];

// Static methods
schema.statics.addBlock = async function (block) {
    const createdBlock = new this(block);
    return createdBlock.save();
}

schema.statics.makeSummaryList = async function (query) {
    const fieldsToKeep = [
        'userId',
        'experimentId',
        'progressionId',
        'curriculumId',
        'associativeId',
        'associativeIdOrdinalNumber',
        'logLabel',

        'startCount',
        'completionCount',

        'username',
        'curriculumTitle',
        'experimentGroup',
        'experimentName',
        'experimentVersion',

        'blockType',
        'blockSubType',
        'index',
        'innerIndex',
        'repetition',
        'isInPrelude',
        'timestamp',
        
        'createdAt',
    ];
    return this.find(query, fieldsToKeep);
}

schema.statics.getFileRelevantData = async function (query) {
    return this.find(query, irrelevantFieldsForScientist);
}

schema.statics.getOneLogFromId = async function (logId) {
    return this.findById(logId, irrelevantFieldsForScientist);
}

// Creating the model
const model = mongoose.model('Log-Simple', schema);
const adminModel = mongoose.model('Admin-Log-Simple', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}