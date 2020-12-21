import experimentStoreState from '../state';
import blockHandler from './blockHandler';

export default {
	updateVariables,
};

function updateVariables(flow, cursor) {
	// Parsing the current block's state settings
	const currentBlock = blockHandler.getCurrentBlock(flow, cursor);
	const {
		resetVariable,
		incrementVariable,
		decrementVariable,
		incrementVariableOnSucess,
		decrementVariableOnSucces,
	} = currentBlock;

	if (resetVariable) resetVariableValue(resetVariableValue);

	if (incrementVariable) incrementVariableValue(incrementVariable);
	else if (experimentStoreState.state.record.isSuccess && incrementVariableOnSucess)
		incrementVariableValue(incrementVariableOnSucess);

	if (decrementVariable) decrementVariableValue(decrementVariable);
	else if (experimentStoreState.state.record.isSuccess && decrementVariableOnSucces)
		decrementVariableValue(decrementVariableOnSucces);
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
