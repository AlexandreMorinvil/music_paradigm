const db = require('database/db');
const CurriculumModel = db.Curriculum;

module.exports = {
    createCurriculum,
    deleteCurriculum,
    getCurriculumById,
    getCurriculumSummariesList,
    updateCurriculum,
};

async function createCurriculum(curriculumParameters) {
    try {
        const curriculumCreated = await CurriculumModel.createCurriculum(curriculumParameters);

        return {
            curriculum: curriculumCreated,
        };
    } catch (err) {
        // Add a cast error in the error answer handling as Mongoose doesn't allow custom cast error messages 
        console.log(err);
        if (err.errors)
            Object.values(err.errors)
                .filter(fieldError => fieldError.name === 'CastError')
                .forEach(() => {
                    err = new Error("A task must be specified for all sessions");
                });
        
        else if (err?.errmsg?.includes("1100"))
            throw new Error("A curriculum with this title already exists");

        throw err;
    }
}

async function deleteCurriculum(id) {
    const curriculum = await CurriculumModel.findById(id);
    if (!curriculum) throw new Error('Curriculum to delete not found');

    return await curriculum.remove();
}

async function getCurriculumById(id) {
    const curriculum = await CurriculumModel.findById(id);

    return {
        curriculum,
    };
}

async function getCurriculumSummariesList() {
    const curriculumSummariesList = await CurriculumModel.getCurriculumSummariesList();

    return {
        summariesList: curriculumSummariesList,
    };
}

async function updateCurriculum(id, updatedCurriculum) {
    const curriculum = await CurriculumModel.findById(id);
    if (!curriculum) throw new Error('Curriculum to update not found');

    const curriculumUpdated = await curriculum.update(updatedCurriculum);

    return {
        curriculum: curriculumUpdated,
    };
}