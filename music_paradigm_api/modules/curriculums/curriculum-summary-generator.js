const CurriculumModel = require('database/db').Curriculum;
const ProgressionModel = require('database/db').Progression;

const CurriculumSummary = require('modules/curriculums/class/curriculum-summary.class');

// Exports
module.exports = {
    generateCurriculumSummariesList,
};

async function generateCurriculumSummariesList() {
    const curriculumSummariesList = [];
    const curriculumsList = await CurriculumModel.find();
    await Promise.all(curriculumsList.map(async (curriculum) => {
        curriculumSummariesList.push(await generateCurriculumSummary(curriculum));
    }));
    return curriculumSummariesList;
};

async function generateCurriculumSummary(curriculumDocument) {

    const progressionsInvolvedCount = await ProgressionModel
        .countDocuments({ curriculumReference: curriculumDocument._id });

    const parametersList = await curriculumDocument.getParametersList();

    return new CurriculumSummary({
        progressionsInvolvedCount,
        parametersList,
        ...curriculumDocument.toObject(),
    })
}