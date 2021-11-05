import { log, validator } from '@/_helpers';

export default {
	DEFAULT_MINIMAL_EXPERIMENT,
	DEFAULT_EMPTY_SELECTION,
	EMPTY_EXPERIMENTS_HEADERS_LIST,
	DEFAULT_IMPOSED_PARAMETERS,
	DEFAULT_LOG_TYPE,
};

/**
 * Return the minimal content for an empty experiment
 * @returns Minimal content for an empty experiment
 */
function DEFAULT_MINIMAL_EXPERIMENT() {
	return validator.getMinimalValidExperimentStructure();
}

/**
 * Returns an empty selected experiment
 * @returns Object with an undefined experiment ID and the minimal content for an empty experiment
 */
function DEFAULT_EMPTY_SELECTION() {
	return {
		_id: null,
		content: DEFAULT_MINIMAL_EXPERIMENT(),
	};
}

/**
 * Returns a placeholder list to contain the list of all experiments
 * @returns An array with a placeholder empty experiment header
 */
function EMPTY_EXPERIMENTS_HEADERS_LIST() {
	return [
		{
			_id: '',
			group: '',
			name: '',
			version: 0,
			folder: '',
		},
	];
}

/**
 * Returns the default imposed parameters
 * @returns An empty array
 */
function DEFAULT_IMPOSED_PARAMETERS() {
	return [];
}

/**
 * Returns the default log type for the experiments (the log types can either be 'none', 'simple' or 'thorough')
 * @returns The string 'Simple'
 */
function DEFAULT_LOG_TYPE() {
	return log.defaultLogType;
}
