const db = require('database/db');
const Curriculum = db.Curriculum;

module.exports = {
    create,
    getListAllHeaders,
    getById,
    update,
    // delete: _delete
};

async function getListAllHeaders() {
    try {
        return await Curriculum.getListAllHeaders();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return await Curriculum.findById(id);
    } catch (err) {
        throw err;
    }
}

async function create(curriculumParameters) {
    try {
        const curriculum = new Curriculum(curriculumParameters);
        return await curriculum.save();
    } catch (err) {
        // Add a cast error in the error answer handlinf as Mongoose doesn't allow custom cast error messages 
        Object.values(err.errors)
            .filter(fieldError => fieldError.name === 'CastError')
            .forEach(() => {
                err.message = "A proper experiment must be specified for all experiments";
            });
        throw err;
    }
}

async function update(id, updatedCurriculum) {
    try {
        // Retreive the experiemtn to update
        const curriculum = await Curriculum.findById(id);
        if (!curriculum) throw new Error('Curriculum to update not found');

        // Update the experiment
        curriculum.update(updatedCurriculum);
        return curriculum.save();
    }
    catch (err) {
        throw err;
    }
}


// async function _delete(id) {
//     await timeout.dbQuery(
//         Collection.findByIdAndRemove(id));
// }