module.exports = {
    getAdvanceStartDate,
    getAdvanceStartTime,
    getLastAdvanceDate,
    getLastAdvanceTime,
    getDuration,
    getExperimentAssociated
};

/**
 * Returns the date of where the progression officially started counting time
 * @param  {Object} progression     Progression from which the information will be fetched 
 * @return {Date}                   The date where the progression was started
 *                      
*/
function getAdvanceStartDate(progression) {
    return progression ? progression.startTime : null;
}

/**
 * Returns the time spaned from the moment where the progression officially started counting time
 * @param  {Object} progression     Progression from which the information will be fetched 
 * @return {Date}                   The date where the progression was started
 *                      
*/
function getAdvanceStartTime(progression) {
    if (!progression) return null;
    return progression ? progression.startTimePassed : null;
}

/**
 * Returns the time spaned from the moment the last advance was done in the progression
 * @param  {Object} progression     Progression from which the information will be fetched 
 * @return {Date}                   The date of the last advance done in the progression
 *                      
*/
function getLastAdvanceDate(progression) {
    return progression ? progression.lastProgressionDate : null;
}

/**
 * Returns the date of the last advance done in the progression
 * @param  {Object} progression     Progression from which the information will be fetched 
 * @return {Date}                   The date of the last advance done in the progression
 *                      
*/
function getLastAdvanceTime(progression) {
    if (!progression) return null;
    return progression ? progression.lastProgessionTimePassed : null;
}

/**
 * Returns the duration over which the progression took place
 * @param  {Object} progression     Progression from which the information will be fetched 
 * @return {Date}                   The date of the last advance done in the progression
 *                      
*/
function getDuration(progression) {
    if (!progression) return null;
    return progression ? progression.duration : null;
}



/**
 * Returns the nested experimetn associacted to an associative ID and it's orinal number
 * @param  {Object} progression     Progression from which the information will be fetched
 * @return {Date}                   The date of the last advance done in the progression
 *                      
*/
function getExperimentAssociated(progression, associativeId, associativeIdOrdinalNumber = 0) {
    return progression.experiments.find(experiment => {
        return (experiment.associativeId === associativeId)
            && (experiment.associativeIdOrdinalNumber === associativeIdOrdinalNumber);
    });
}