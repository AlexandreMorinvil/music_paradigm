module.exports = {
    generateProgressionToCurriculumAssociation,
    indicateExperimentMakersInProgressionAssociation,
    generateProgressionToCurriculumAssociationSummary,
};

/**
 * @param  {Object} curriculum  
 * @param  {Object} progression 
 * @return {Array}  Array of objects containing the association of the expriements as specified in a curriculum and as present if the progression of the use if it was completed at least once :
 *  [
 *      {
 *          associativeId: String,
 *          associativeIdOrdinalNumber: Number,
 *          curriculumExperiment: {associativeId: String, title: String, delayInDays: Number, releaseTime: String, isUniqueInDay: Boolean, ...}, 
 *          progressionExperiment:{associativeId: String, associativeIdOrdinalNumber: Number, startCOunt: Number, completionCount: Number, ...}
 *      }
 *  ]                   
*/

function generateProgressionToCurriculumAssociation(curriculum, progression) {

    // Verify the parameters
    if (!curriculum) return []
    if (!progression || !progression.experiments) progression = { experiments: [] }

    // This conversion table is particularily neccessary to handle the situations where the curriculum would be modified 
    // while a user's prgression was already well advanced. This way, it is possible to retreive the completed part 
    // of the curriculum from the progression, even though the two might not correspond 1 to 1 anymore.
    encounteredAssociativeId = {};
    const association = []
    for (let i = 0; i < curriculum.experiments.length; i++) {

        // Retreive the associative ID
        const { associativeId } = curriculum.experiments[i];

        // Initialize the counter for the numnber of times the associative ID is encountered (to avoid having 2 experiments 
        // considered as exactly the same if they have the same associative ID). Everytime an associative ID is encountered, 
        // we increment the ordinal number of the associative ID.
        if (typeof encounteredAssociativeId[associativeId] !== 'number') encounteredAssociativeId[associativeId] = 0;
        else encounteredAssociativeId[associativeId] += 1;
        const associativeIdOrdinalNumber = encounteredAssociativeId[associativeId];

        // If there exists an entry in the progression for the experiment, we add it to the association
        const progressionExperiment = progression.experiments.find((experiment) => {
            return experiment.associativeId === associativeId
                && experiment.associativeIdOrdinalNumber === associativeIdOrdinalNumber
        })

        // Initialize an association
        association[i] = {
            associativeId: associativeId,
            associativeIdOrdinalNumber: associativeIdOrdinalNumber,
            curriculumExperiment: curriculum.experiments[i],
            progressionExperiment: progressionExperiment || {},
        };
    }
    return association
}

/**
 * @param  {Array<Object>}  associations  
 * @param  {Array<Object>}  experimentMakers 
 * @return {Array<Object>}  The associations with a 'hasExperimentMarker' boolean field indicating if
 *                          it has an experiment marker.
 *                      
*/
function indicateExperimentMakersInProgressionAssociation(associations, experimentMakers) {

    // Verify the parameters
    if (!associations || associations.length < 1) return []
    if (!experimentMakers || experimentMakers.length < 1) return associations;

    // We indicate it if the experiment has a marker
    associations.forEach(association => {
        const { associativeId } = association;

        // Idicate if there is an experiment marker
        const marker = experimentMakers.find((marker) => marker.associativeId === associativeId);
        association.hasExperimentMarker = Boolean(marker);

        // Indicate the progression ratio
        if (association.hasExperimentMarker) association.experimentMarkerProgressRatio = marker.progressRatio || 0;
        else association.experimentMarkerProgressRatio = 0;
    });
    return associations;
}

/**
 * @param  {Object} curriculum  
 * @param  {Object} progression 
 * @return {Object} Summary of the progression of the user considering his curriculum :
 *  {
 *      reachedSessionTitle: String,
 *      progressionCompletedSessionsCount: Number,
 *      curriculumSessionsCount: Number
 *  }
 *                      
*/
function generateProgressionToCurriculumAssociationSummary(curriculum, progression) {

    // If the user doesn't have a curriculum assigned or a progression started, we return an unstarted progression summary
    if (!(curriculum && progression)) return {
        isAdvanceResultOfConsiderCompletedAdjustmentSessions: false,
        reachedSessionTitle: null,
        progressionCompletedSessionsCount: 0,
        curriculumSessionsCount: 0,
    }

    // Otherwise, we produce a progression summary
    const association = generateProgressionToCurriculumAssociation(curriculum, progression);

    // Used to keep track of whether an experiment was completed while previosu ones are not 
    // (this can only happen if an experiment is forced available thorugh an adjustment)
    let hasReachedEndOfProgress = false;

    // Indicate whether the count was altered through an ajustment. This could either be that
    // a session is adjusted to be considered adjusted while it wasn't.
    let isAdvanceResultOfConsiderCompletedAdjustmentSessions = false;


    // When a session supposed to be available later was completed before it's turn was reached,
    // we increment the in advance count.
    let inAdvanceCount = 0;

    // Indicate whether it is no longer possible for the user to progress due to being blocked
    // by an adjustment brought by the admins
    let isProgressionBlocked = false;

    const completedExperiments = association.filter(element => {
        const { progressionExperiment } = element;

        // Verify if it is completed or considered completed
        if (progressionExperiment.completionCount >= progressionExperiment.completionsNeeded) {
            if (hasReachedEndOfProgress) {
                inAdvanceCount += 1;
                return false;
            }
            else {
                return true;
            }
        } else if (progressionExperiment.adjustmentConsiderCompleted) {
            isAdvanceResultOfConsiderCompletedAdjustmentSessions = true;
            return true;
        }

        // If it is not completed and we reach a blocked session, we indicate that his progress is blocked
        if (!hasReachedEndOfProgress && progressionExperiment.adjustmentBlockAvailability) {
            isProgressionBlocked = true;
        }

        // Indicate the end of the normal progress of the user
        hasReachedEndOfProgress = true;
        return false;
    });

    const reachedSession = (completedExperiments.length < association.length) ? 
        association[completedExperiments.length].curriculumExperiment.title : 
        null;
        
    return {
        isAdvanceResultOfConsiderCompletedAdjustmentSessions: isAdvanceResultOfConsiderCompletedAdjustmentSessions,
        inAdvanceCount: inAdvanceCount,
        isProgressionBlocked: isProgressionBlocked,
        reachedSessionTitle: reachedSession,
        progressionCompletedSessionsCount: completedExperiments.length,
        curriculumSessionsCount: association.length
    }
}
