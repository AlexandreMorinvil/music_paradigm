// All logs

/**
 * @constant
 * @type {Array<String>}
 * @description List of all the log types
 */
const logTypeOptions = ['none', 'simple', 'thorough'];

/**
 * @constant
 * @type {Array<String>}
 * @default 'simple'
 * @description List of the states that are considered for the types that are valid of a simple log entry
 */
const defaultLogType = logTypeOptions[2];

/**
 * Returns the list of all the possible log types
 * @returns {Array<String>} An array with the names of all the possible log types
 */
function returnValidLogType(logType) {
	return logTypeOptions.includes(logType) ? logType : 'simple';
}

// Simple logs

/**
 * @constant
 * @type {Array<String>}
 * @description List of the states that are considered for the types that are valid of a simple log entry
 */
const statesConsideredInSimpleLogs = ['playing', 'writting', 'survey', 'question'];

/**
 * Returns wether a state type given in parameter should be considered in the simple logs
 * @param {String} stateType		The state type of the block considered for a simple log entry
 * @returns {Boolean} True is the state type is one to generate a simple log entry, false otherwise
 */
function isStateConsideredInSimpleLog(stateType) {
	return statesConsideredInSimpleLogs.includes(stateType);
}

export default {
	logTypeOptions,
	defaultLogType,
	returnValidLogType,
	isStateConsideredInSimpleLog,
};
