const User = require('database/models/user/user.model');
const Curriculum = require('database/models/curriculum/curriculum.model');
const Experiment = require('database/models/experiment/experiment.model');
const ExperimentMarker = require('database/models/experiment-marker/experiment-marker.model');

module.exports = {
    getSessionInformation,
    initializeSession,
    concludeSession,
    saveSessionState,
};

/**
 * Returns all the information required for a normal user to start a session normally
*/
async function getSessionInformation(userId, associativeId, associativeIdOrdinalNumber) {

    const progression = await User.getLastProgression(userId);
    const curriculum = await Curriculum.findById(progression.curriculumReference);
    const experimentDoneInProgression = progression.getExperimentAssociated(associativeId, associativeIdOrdinalNumber) || {};
    const experimentPlanedInCurriculum = curriculum.getExperimentAssociated(associativeId);
    const experimentDefinition = await Experiment.findById(experimentPlanedInCurriculum.experimentReference);
    const experimentMaker = await ExperimentMarker.findMarker(progression._id, associativeId) || {};

    const sessionInformation = {
        // Identification
        curriculumId: curriculum._id,
        progressionId: progression._id,
        associativeId: associativeId,
        associativeIdOrdinalNumber: associativeIdOrdinalNumber,

        // Curriculum rules
        curriculumTitle: curriculum.title,
        logType: curriculum.logType,

        // Curriculum indications for the specific experiment
        title: experimentPlanedInCurriculum.title,
        text: experimentPlanedInCurriculum.text,

        // Progression rules 
        assignedParameters: progression.assignedParameters,

        // Progression indications for the specific experiment
        startCount: (experimentDoneInProgression.startCount || 0) + 1,
        completionCount: (experimentDoneInProgression.completionCount || 0),

        // Content of the experiment
        experiment: experimentDefinition.getDefinition(),

        // Experiment marker (if present)
        previousState: experimentMaker.state,
        previousCursor: experimentMaker.cursor,
        previousTimeIndicated: experimentMaker.timeIndicated,
    };

    return sessionInformation;
};

async function initializeSession(userId, associativeId, associativeIdOrdinalNumber) {

    const progression = await User.getLastProgression(userId);
    const curriculum = await Curriculum.findById(progression.curriculumReference);
    let experimentDoneInProgression = progression.getExperimentAssociated(associativeId, associativeIdOrdinalNumber);
    const experimentPlanedInCurriculum = await curriculum.getExperimentAssociated(associativeId);

    // Create a nexted associated experiment to put in the progression if it doesn't exist
    if (!experimentDoneInProgression) {

        // Create the experiment in the progression
        experimentDoneInProgression = {
            associativeId: associativeId,
            associativeIdOrdinalNumber: associativeIdOrdinalNumber,
            experimentReference: experimentPlanedInCurriculum.experimentReference
        };

        // Add the record in the progression
        progression.experiments.push(experimentDoneInProgression);

    } else {
        experimentDoneInProgression.experimentReference = experimentPlanedInCurriculum.experimentReference;
    }

    // Increment the number of times the experiment was started
    experimentDoneInProgression.startCount += 1;

    // If the start time is not set, this is the first time we do an experiment and we are this starting the curriculum now
    if (!progression.startTime) progression.startTime = Date.now();

    // Save changes
    return progression.save();
};

async function concludeSession(userId, associativeId, associativeIdOrdinalNumber, isInTimeUp) {

    const progression = await User.getLastProgression(userId);
    const curriculum = await Curriculum.findById(progression.curriculumReference);
    const experimentPlanedInCurriculum = await curriculum.getExperimentAssociated(associativeId);
    let experimentDoneInProgression = progression.getExperimentAssociated(associativeId, associativeIdOrdinalNumber);

    // Create a nexted associated experiment to put in the progression
    if (!experimentDoneInProgression) {

        // create the experiment in the progression
        experimentDoneInProgression = {
            experimentReference: experimentPlanedInCurriculum.experimentReference,
            associativeId: associativeId,
            associativeIdOrdinalNumber: associativeIdOrdinalNumber,
            completionCount: 1
        };

        // Add the record in the progression
        progression.experiments.push(experimentDoneInProgression);

    }
    // Increase completion count
    else {
        experimentDoneInProgression.completionCount += 1;
    }

    // Remove the experiment marker if the experiment was completely finished (keep it if it was ended through a timeout)
    if (!isInTimeUp) await ExperimentMarker.deleteMarker(progression._id, associativeId);
    else await ExperimentMarker.forgetTimeLeft(progression._id, associativeId);


    // If the experiment was completed for a first, it is a progression in the curriculum, therrefore, we update the last progression time
    if (experimentDoneInProgression.completionCount === 1) progression.lastProgressionDate = Date.now();

    // Save changes
    return progression.save();
};

async function saveSessionState(userId, associativeId, cursor, state, timeIndicated) {

    // Update or create the marker
    const progression = await User.getLastProgression(userId);
    if (!progression) return;
    const experimentMarker = await ExperimentMarker.findMarker(progression._id, associativeId);

    // Assign the state of the session to the marker
    if (experimentMarker) experimentMarker.updateMaker(cursor, state, timeIndicated);
    else ExperimentMarker.createMaker(progression._id, associativeId, cursor, state, timeIndicated);

    // Save changes
    return progression.save();
};
