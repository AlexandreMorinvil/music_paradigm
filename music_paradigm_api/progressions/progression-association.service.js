module.exports = {
    generateProgressionToCurriculumAssociation,
    generateProgressionToCurriculumAssociationSummary,
};

/**
 * @param  {[type]} curriculum  
 * @param  {[type]} progression 
 * @return {Array}              Array of objects containing the association of the expriements as specified in a curriculum and as present if the progression of the use if it was completed at least once :
 *                              {
 *                                  associativeId: String,
 *                                  associativeIdOrdinalNumber: Number,
 *                                  curriculumExperiment: {associativeId: String, title: String, delayInDays: Number, releaseTime: String, isUniqueIndDay: Boolean, ...}, 
 *                                  progressionExperiment:{associativeId: String, associativeIdOrdinalNumber: Number, startCOunt: Number, completionCount: Number, ...}
 *                              }
 *                      
*/

function generateProgressionToCurriculumAssociation(curriculum, progression) {

    // Verify the parameters
    if (!curriculum) return []
    if (!progression || !progression.experiments) progression = { experiments: [] }

    // This conversion table is particularily useful to handle the situations where the curriculum would be modified 
    // while a user's prgression was already well advanced. This way, it is possible to retreive the completed part 
    // of the curriculum from the progression, even though the two might not correspond 1 to 1 anymore.
    encounteredAssociativeId = {};
    const association = []
    for (let i = 0; i < curriculum.experiments.length; i++) {

        // Initialize the counter for the numnber of time the associative ID is encountered (to avoid having 2 experiments 
        // considered as exactly the same) if they have the same associative ID
        let encountersCount = 0;
        const associativeId = curriculum.experiments[i].associativeId;
        if (typeof encounteredAssociativeId[associativeId] !== 'number') encounteredAssociativeId[associativeId] = 0;

        // Initialize an association
        association.push({
            associativeId: associativeId,
            curriculumExperiment: curriculum.experiments[i],
        });

        // If the association is not fount in the progression, we will associate an empty dummy progression experiment
        let progressionExperiment = {};

        // Perform the association between the expriments in the curriculum and the experiments done
        for (let j = 0; j < progression.experiments.length; j++) {
            if (curriculum.experiments[i].associativeId === progression.experiments[j].associativeId) {

                // Everytime the associative Id is encountered, we increment the encounter count
                if (encountersCount < encounteredAssociativeId[associativeId]) encountersCount += 1;

                // If the associativeId and the associativeIdOrdinalNumber correspond, we will add this progression 
                // experiment to the associtaiton and we memory the ordinal number of this associativeId
                else {
                    progressionExperiment = progression.experiments[j]
                    break;
                }
            }
        }

        // Associate the progression experiment
        Object.assign(association[i], {
            associativeIdOrdinalNumber: encounteredAssociativeId[associativeId],
            progressionExperiment: progressionExperiment
        });
        encounteredAssociativeId[associativeId] += 1;

    }
    return association
}

/**
 * @param  {[type]} curriculum  
 * @param  {[type]} progression 
 * @return {Object}             Summary of the progression of the user considering his curriculum :
 *                              {
 *                                  reachedExperimentTitle: String,
 *                                  progressionTotalNumber: Number,
 *                                  curriculumTotalNumber: Number
 *                              }
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
