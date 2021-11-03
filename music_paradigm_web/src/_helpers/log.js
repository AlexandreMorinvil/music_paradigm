const logTypeOptions = ['none', 'simple', 'thorough'];
const defaultLogType = logTypeOptions[1];

function returnValidLogType(logType) {
	return logTypeOptions.includes(logType) ? logType : 'simple';
}

export default {
	logTypeOptions,
	defaultLogType,
	returnValidLogType,
};
