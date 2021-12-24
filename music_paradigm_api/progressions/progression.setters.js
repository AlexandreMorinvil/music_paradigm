module.exports = {
    setParameters,
    setAdjustements,
};

/**
 * Set the global ajustments of the progression
 * @param  {Object} progression                                 Progression to which the adjustments will be applied
 * @param  {Object} parameters                                  Object containging the parameters to assign
 * @return {Object}                                             The progression with the parameters assigned  
 *                      
*/
function setParameters(progression, parameters = {}) {
    progression.assignedParameters = { ...parameters };
    return progression;
}

/**
 * Set all the adjustments to the progression
 * @param  {Object} progression                                 Progression to which the adjustments will be applied
 * @param  {Array<Object>}  progression.experiments             List of the experiments in the progression
 * @param  {Object}  allAdjustments                             Object containing all the adjustments to apply to the progression (global and experiment specific)
 * @param  {Array<Object>} allAdjustments.sessionsAjustments    Array containging the adjustments to apply to some specific experiments
 * @return {Object}                                             The progression with the adjustments applied  
 *                      
*/
function setAdjustements(progression, allAdjustments = {}) {
    if(!allAdjustments) return progression;
    progression = setGlobalAdjustements(progression, allAdjustments);
    progression = setSessionAdjustements(progression, allAdjustments.sessionAdjustments);
    return progression;
}

/**
 * Set the global ajustments of the progression
 * @param  {Object} progression                                 Progression to which the adjustments will be applied
 * @param  {Object} globalAjustments                            Object containging the adjustments to apply to to progression globally
 * @return {Object}                                             The progression with the adjustments applied  
 *                      
*/
function setGlobalAdjustements(progression, globalAjustments = {}) {
    if(!globalAjustments) return progression;
    if (globalAjustments.hasOwnProperty('adjustmentStartTimeInDays')) progression.adjustmentStartTimeInDays = globalAjustments.adjustmentStartTimeInDays;
    return progression;
}

/**
 * Set the experiment specific adjustments of the progression
 * @param  {Object}         progression                         Progression to which the adjsutments will be applied
 * @param  {Array<Object>}  progression.experiments             List of the experiments in the progression
 * @param  {Array<Object>}  sessionsAjustments                  Array containging the adjustments to apply to some specific experiments
 * @return {Object}                                             The progression with the adjustments applied  
 *                      
*/
function setSessionAdjustements(progression, sessionsAjustments = []) {
    if(!sessionsAjustments) return progression;
    sessionsAjustments.forEach(adjustments => {

        // Retreive the experiments that have the associated with the session adjustments
        experiment = progression.find(experiment => {
            return experiment.associativeId === adjustments.associativeId
                && experiment.associativeIdOrdinalNumber === adjustments.associativeIdOrdinalNumber
        })
        
        // Apply the adjustments to the experiment
        if (!experiment) return;
        if (adjustments.hasOwnProperty('adjustmentDelayInDays')) experiment.adjustmentDelayInDays = adjustments.adjustmentDelayInDays;
        if (adjustments.hasOwnProperty('adjustmentConsiderCompleted')) experiment.adjustmentConsiderCompleted = adjustments.adjustmentConsiderCompleted;
        if (adjustments.hasOwnProperty('adjustmentConsiderCompleted')) experiment.adjustmentAdditionalCompletionsRequired = adjustments.adjustmentAdditionalCompletionsRequired;
        if (adjustments.hasOwnProperty('adjustmentPreponeAvailability')) experiment.adjustmentPreponeAvailability = adjustments.adjustmentPreponeAvailability;

    });

    return progression;
}