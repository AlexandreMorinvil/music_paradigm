export default {
	getParameterVariables,
};

function getParameterVariables(experiment) {
	if (!experiment.variables) return [];
	return experiment.variables.filter((variable) => variable.type === 'parameter');
}
