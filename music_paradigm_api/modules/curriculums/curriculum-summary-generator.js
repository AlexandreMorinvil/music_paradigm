const CurriculumModel = require('database/db').Curriculum;
const ProgressionModel = require('database/db').Progression;

const CurriculumSummary = require('modules/curriculums/class/curriculum-summary.class');

// Exports
module.exports = {
    generateCurriculumSummariesList,
};

async function generateCurriculumSummariesList() {
    const curriculumSummariesList = [];
    const curriculumsObjectList = await CurriculumModel.find().lean();
    await Promise.all(curriculumsObjectList.map(async (curriculumObject) => {
        curriculumSummariesList.push(await generateCurriculumSummary(curriculumObject));
    }));
    return curriculumSummariesList;
};

async function generateCurriculumSummary(curriculum) {

    const progressionsInvolvedCount = await ProgressionModel
        .countDocuments({ curriculumReference: curriculum._id });

    return new CurriculumSummary({
        progressionsInvolvedCount,
        ...curriculum,
    })
}