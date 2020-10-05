const db = require('database/db');
const jwt = require('jwt/jwt');
const Progression = db.Progression;
const Experiment = db.Experiment;
const Curriculum = db.Curriculum;
const User = db.User;

module.exports = {
    updateProgression,
    generateProgressionSummary,
};

async function updateProgression(userId) {
    const curriculumProgression = await User.findById(userId, 'curriculum progressions').populate({ path: 'curriculum progressions' });
    const { curriculum, progressions } = curriculumProgression.toObject();

    // Do not generate a progression if no curriculum is associated to the user
    if (!curriculum) return;

    // Generate a progression if there is a curriculum but no progression registered
    if (progressions.length === 0) return await generateProgression(userId);  

    // Generate a progression if the last registered progression is not for the current curriculum
    const curriculumId = curriculum._id.toString();
    const curriculumIdLastProgression = (progressions.pop()).curriculumReference.toString();
    if (curriculumId !== curriculumIdLastProgression) return await generateProgression(userId)
}

async function generateProgression(userId) {
    const user = await User.findById(userId);
    const progression = new Progression({
        userReference: user._id,
        curriculumReference: user.curriculum
    });
    user.progressions.push(progression);
    progression.save();
    user.save();
}


async function generateProgressionSummary(userId) {
    // Fetch the curriculum and the progressions from the user
    const curriculumProgression = await User.findById(userId, 'curriculum progressions').populate({ path: 'curriculum progressions' });
    const { curriculum, progressions } = curriculumProgression.toObject();

    console.log(curriculum);
    console.log(progressions);

    const a = curriculumProgression.toObject();
    console.log(a);
}