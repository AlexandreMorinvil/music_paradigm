// All logs

/**
 * @constant
 * @type {Array<String>}
 * @description List of all the log types
 */
const logTypeOptions = ['none', 'thorough'];

/**
 * @constant
 * @type {Array<String>}
 * @default 'simple'
 * @description List of the states that are considered for the types that are valid of a simple log entry
 */
const defaultLogType = logTypeOptions[1];

/**
 * Returns the list of all the possible log types
 * @returns {Array<String>} An array with the names of all the possible log types
 */
function returnValidLogType(logType) {
	return logTypeOptions.includes(logType) ? logType : defaultLogType;
}

export default {
	logTypeOptions,
	defaultLogType,
	returnValidLogType,
};
