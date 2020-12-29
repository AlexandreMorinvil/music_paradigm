import blockHandler from './blockHandler';
import experimentStoreState from '../state';

export default {
	populateVariables,
	updateVariables,
	wrapVariableName,
};

function populateVariables(block) {
	const variables = getAllVariables();
	const blockToPopulate = JSON.parse(JSON.stringify(block));
	for (const section in blockToPopulate) {
		if (typeof blockToPopulate[section] === 'string')
			for (const variable in variables) blockToPopulate[section] = blockToPopulate[section].replace(variable, variables[variable]);
		else if (Array.isArray(blockToPopulate[section])) blockToPopulate[section] = populateVariables(block[section]);
	}
	return blockToPopulate;
}

function updateVariables(flow, cursor) {
	// Parsing the current block's state settings
	const currentBlock = blockHandler.getCurrentBlock(flow, cursor);
	const { resetVariable, incrementVariable, decrementVariable, incrementVariableOnSucess, decrementVariableOnSucces } = currentBlock;

	if (resetVariable) resetVariableValue(resetVariable);

	if (incrementVariable) incrementVariableValue(incrementVariable);
	else if (experimentStoreState.state.record.isSuccess && incrementVariableOnSucess) incrementVariableValue(incrementVariableOnSucess);

	if (decrementVariable) decrementVariableValue(decrementVariable);
	else if (experimentStoreState.state.record.isSuccess && decrementVariableOnSucces) decrementVariableValue(decrementVariableOnSucces);
}

function resetVariableValue(variableName) {
	variableName = wrapVariableName(variableName);
	if (experimentStoreState.variables.value[variableName]) {
		experimentStoreState.variables.value[variableName] = experimentStoreState.variables.initial[variableName];
	}
}

function incrementVariableValue(variableName) {
	variableName = wrapVariableName(variableName);
	if (experimentStoreState.variables.value[variableName]) {
		experimentStoreState.variables.value[variableName] += 1;
	}
}

function decrementVariableValue(variableName) {
	variableName = wrapVariableName(variableName);
	if (experimentStoreState.variables.value[variableName]) {
		experimentStoreState.variables.value[variableName] -= 1;
	}
}

function wrapVariableName(variableName) {
	return '$' + variableName + '$';
}

function wrapStateVariableName(stateVariableName) {
	return '&' + stateVariableName + '&';
}

function getAllVariables() {
	const variables = experimentStoreState.variables.value;

	const stateVariables = {};
	stateVariables[wrapStateVariableName('REPETITIONS_LEFT')] = experimentStoreState.cursor.navigation.numberRepetition;

	return { ...variables, ...stateVariables };
}
