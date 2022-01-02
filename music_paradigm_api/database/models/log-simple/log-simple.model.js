const mongoose = require('mongoose');
schema = require('./log-simple.schema');

schema.set('toJSON', { virtuals: true });

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
    const fieldsToKeep = [
        '-__v',
        '-_id',
        '-id',
        '-userId',
        '-experimentId',
        '-progressionId',
        '-curriculumId',
    ];
    return this.find(query, fieldsToKeep);
}


// Creating the model
const model = mongoose.model('Log-Simple', schema);
const adminModel = mongoose.model('Admin-Log-Simple', schema);

module.exports = {
    model: model,
    adminModel: adminModel
}