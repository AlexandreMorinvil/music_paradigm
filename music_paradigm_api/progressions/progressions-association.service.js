module.exports = {
    generateProgressionToCurriculumAssociation,
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
 *          curriculumExperiment: {associativeId: String, title: String, delayInDays: Number, releaseTime: String, isUniqueIndDay: Boolean, ...}, 
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
        if (!encounteredAssociativeId[associativeId]) encounteredAssociativeId[associativeId] = 0;
        encounteredAssociativeId[associativeId] += 1;
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
 * @param  {[type]} curriculum  
 * @param  {[type]} progression 
 * @return {Object} Summary of the progression of the user considering his curriculum :
 *  {
 *      reachedExperimentTitle: String,
 *      progressionTotalNumber: Number,
 *      curriculumTotalNumber: Number
 *  }
 *                      
*/
function generateProgressionToCurriculumAssociationSummary(curriculum, progression) {

    // If the user doesn't have a curriculum assigned or a progression started, we return an unstarted progression summary
    if (!(curriculum && progression)) return {
        wasProgressionTotalNumberAdjusted: false,
        reachedExperimentTitle: "---",
        progressionTotalNumber: 0,
        curriculumTotalNumber: 0,
    }

    // Otherwise, we produce a progression summary
    const association = generateProgressionToCurriculumAssociation(curriculum, progression);

    // Used to keep track of whether an experiment was completed while previosu ones are not 
    // (this can only happen if an experiment is forced available thorugh an adjustment)
    let hasReachedEndOfProgress = false;

    // Indicate whether the count was altered through an ajustment. This could either be that
    // a session is adjusted to be considered adjusted while it wasn't or this could be that
    // a session supposed to be available later was completed before it's turn was reached,
    // which can also only happen through an adjustment.
    let wasProgressionTotalNumberAdjusted = false;

    const completedExperiments = association.filter(element => {
        if (element.progressionExperiment.completionCount > 0) {
            if (hasReachedEndOfProgress) wasProgressionTotalNumberAdjusted = true;
            return true;
        } else if (element.progressionExperiment.adjustmentConsiderCompleted) {
            wasProgressionTotalNumberAdjusted = true;
            return true;
        }
        else {
            hasReachedEndOfProgress = true;
            return false;
        }
    });
    const reachedExperiment = (completedExperiments.length < association.length) ? association[completedExperiments.length].curriculumExperiment.title : "";
    return {
        wasProgressionTotalNumberAdjusted: wasProgressionTotalNumberAdjusted,
        reachedExperimentTitle: reachedExperiment,
        progressionTotalNumber: completedExperiments.length,
        curriculumTotalNumber: association.length
    }
}
