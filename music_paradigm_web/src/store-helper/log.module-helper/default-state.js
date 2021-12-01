import { log } from '@/_helpers';

export default {
	DEFAULT_LOG_TYPE,
};

/**
 * Returns the default log type for the experiments (the log types can either be 'none', 'simple' or 'thorough')
 * @returns The string 'Simple'
 */
function DEFAULT_LOG_TYPE() {
	return log.defaultLogType;
}
