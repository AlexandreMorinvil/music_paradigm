const convertCurriculumSchema = require('./curriculum.conversions');

async function performConvertions() {
    convertCurriculumSchema();
}

module.exports = performConvertions;