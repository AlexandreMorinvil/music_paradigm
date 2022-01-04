const Progression = require('database/db').Progression;
const User = require('database/db').User;

module.exports = {
    findAndInitializeProgression,
    findAndAddNewProgression,
    initializeProgression,
    addNewProgression,
    updateParameters,
    updateAdjustments,
};

async function findAndInitializeProgression(userId, curriculum, parameters, adjustments) {
    const user = await find(userId);
    return initializeProgression(user, curriculum, parameters, adjustments);
}

async function findAndAddNewProgression(userId, curriculumId, parameters = null, adjustments = null) {
    const user = await find(userId);
    return addNewProgression(user, curriculumId, parameters, adjustments)
}

async function find(userId) {
    const user = await User.findById(userId);
    if (!user) throw Error("User doesn't exist")
    return user;
}

async function initializeProgression(user, curriculum, parameters, adjustments) {
    // Assign curriculum
    if (!curriculum) return null;
    user.curriculum = curriculum;

    // Initialize Progression
    let lastProgression = await user.getLastProgression();
    if (lastProgression) {

        // Put back the last progression as is if the last progression is for the current curriculum
        if (lastProgression.isForCurriculum(user.curriculum)) { /* Do nothing */ }

        // Add a new progression if the last one is associated to another curriculum and was started
        else if (lastProgression.wasStarted())
            await addNewProgression(user, curriculum, parameters, adjustments);

        // Remove the progression if it was not started
        else {
            await User.findOneAndUpdate({ _id: user._id }, { $pull: { progressions: lastProgression._id } })
            await lastProgression.remove();
            lastProgression = await user.getLastProgression();

            // Put back the last progression as is if the new last progression is for the current curriculum
            if (lastProgression && lastProgression.isForCurriculum(user.curriculum)) { /* Do nothing */ }

            // If the mew last progression is for another curriculum, we add a new progression 
            else await addNewProgression(user, curriculum, parameters, adjustments);
        }
    }
    // If there were no previous progressions, we add one
    else await addNewProgression(user, curriculum, parameters, adjustments);

    await user.save();
    return user.getLastProgression();
}

async function addNewProgression(user, curriculumId, parameters = null, adjustments = null) {
    const newProgression = await Progression.create(user._id, curriculumId, parameters, adjustments)
    user.progressions.push(newProgression);
    return user.save();
}

async function updateParameters(userId, assignedParameters) {
    const lastProgression = await User.getLastProgression(userId);
    return lastProgression.assignParameters(assignedParameters);
}

async function updateAdjustments(userId, assignedAdjustments) {
    const lastProgression = await User.getLastProgression(userId);
    return lastProgression.assignAdjustments(assignedAdjustments);
}