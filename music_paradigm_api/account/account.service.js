const db = require('database/db');
const jwt = require('jwt/jwt');
const progressionService = require('account/progression.service');
const Experiment = db.Experiment;
const Curriculum = db.Curriculum;
const User = db.User;

module.exports = {
    authenticate,
    getProgressionSummary,
    getTodayExperiment,
    // getListAllHeaders,
    // getById,
    // update,
    // delete: _delete
};

async function authenticate({ username, password }) {
    try {
        const userWithoutPassword = await User.authenticate(username, password);
        await progressionService.updateProgression(userWithoutPassword._id.toString());
        const token = jwt.generateToken(userWithoutPassword);

        return {
            ...userWithoutPassword,
            token
        };
    } catch (err) {
        if (!err.message)
            throw new Error("Username or password is incorrect");
        else
            throw err;
    }
}

async function getProgressionSummary(userId) {
    try {
        return await progressionService.generateProgressionSummary(userId);

    } catch (err) {
        throw err;
    }
}

async function getTodayExperiment(userId) {
    try {
        return await Curriculum.getListAllHeaders();
    } catch (err) {
        throw err;
    }
}

// async function getListAllHeaders() {
//     try {
//         return await Curriculum.getListAllHeaders();
//     } catch (err) {
//         throw err;
//     }
// }

// async function getById(id) {
//     try {
//         return await Curriculum.findById(id);
//     } catch (err) {
//         throw err;
//     }
// }

// async function create(curriculumParameters) {
//     try {
//         const curriculum = new Curriculum(curriculumParameters);
//         return await curriculum.save();
//     } catch (err) {
//         // Add a cast error in the error answer handlinf as Mongoose doesn't allow custom cast error messages 
//         Object.values(err.errors)
//             .filter(fieldError => fieldError.name === 'CastError')
//             .forEach(() => {
//                 err.message = "A proper experiment must be specified for all experiments";
//             });
//         throw err;
//     }
// }

// async function update(id, updatedCurriculum) {
//     try {
//         // Retreive the experiemtn to update
//         const curriculum = await Curriculum.findById(id);
//         if (!curriculum) throw new Error('Curriculum to update not found');

//         // Update the experiment
//         curriculum.update(updatedCurriculum);
//         return curriculum.save();
//     }
//     catch (err) {
//         throw err;
//     }
// }

// async function _delete(id) {
//     try {
//         const curriculum = await Curriculum.findById(id);
//         if (!curriculum) throw new Error('Curriculum to delete not found');
        
//         return await curriculum.remove();
//     } catch (err) {
//         throw err;
//     }
// }