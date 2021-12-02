import blockHandler from './block-handler';
import experimentStoreState from '@/store/experiment.module/state';

export default {
	populateVariables,
	updateVariables,
	wrapVariableName,
};

/**
 * Replaces the variable names in the experiment description by their appropriate value.
 * @param {Object} block 			Block containing experiment desciptions that need to be populated
 * @param {Object} variablesToUse	Object containign the variables to populate
 * @returns {Object} 				Block with the variables populated
 */
function populateVariables(block, variablesToUse = null) {
	const variables = variablesToUse || getAllVariables();
	const blockToPopulate = JSON.parse(JSON.stringify(block));
	for (const section in blockToPopulate) {
		if (typeof blockToPopulate[section] === 'string')
			for (const variable in variables) performVariableReplacement(blockToPopulate, section, variables, variable);
		else if (Array.isArray(blockToPopulate[section]) || typeof blockToPopulate[section] === 'object') 	
			blockToPopulate[section] = populateVariables(block[section], variablesToUse);
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

function performVariableReplacement(blockToPopulate, section, variables, variable) {
	blockToPopulate[section] = blockToPopulate[section].replace(variable, variables[variable]);
}

function resetVariableValue(variableName) {
	variableName = wrapVariableName(variableName);
	if (experimentStoreState.variables.dynamicValue[variableName]) {
		experimentStoreState.variables.dynamicValue[variableName] = experimentStoreState.variables.initialValue[variableName];
	}
}

function incrementVariableValue(variableName) {
	variableName = wrapVariableName(variableName);
	if (experimentStoreState.variables.dynamicValue[variableName]) {
		experimentStoreState.variables.dynamicValue[variableName] += 1;
	}
}

function decrementVariableValue(variableName) {
	variableName = wrapVariableName(variableName);
	if (experimentStoreState.variables.dynamicValue[variableName]) {
		experimentStoreState.variables.dynamicValue[variableName] -= 1;
	}
}

function wrapVariableName(variableName) {
	return '$' + variableName + '$';
}

function wrapStateVariableName(stateVariableName) {
	return '&' + stateVariableName + '&';
}

function getAllVariables() {
	// Get the current value of the dynamic variables
	const variables = experimentStoreState.variables.dynamicValue;
	const variablesWithSelectedValues = getVariablesWithValuesSelected();

	const stateVariables = {};
	stateVariables[wrapStateVariableName('REPETITIONS_CURRENT')] = experimentStoreState.cursor.navigation.totalNumberRepetitions - experimentStoreState.cursor.current.numberRepetition + 1;
	stateVariables[wrapStateVariableName('REPETITIONS_LEFT')] = experimentStoreState.cursor.current.numberRepetition;
	stateVariables[wrapStateVariableName('SUCCESSES_IN_LOOP')] = experimentStoreState.state.record.successesInLoop;
	return { ...variables, ...stateVariables, ...variablesWithSelectedValues };
}


/**
 * Replaces the variable names in the experiment description by their appropriate value.
 * @param {Object} block 			Block containing experiment desciptions that need to be populated
 * @param {Object} variablesToUse	Object containign the variables to populate
 * @returns {Object} 				Block with the variables populated
 */
 function populateVariables(block, variablesToUse = null) {
	const variables = variablesToUse || getAllVariables();
	const blockToPopulate = JSON.parse(JSON.stringify(block));
	for (const section in blockToPopulate) {
		if (typeof blockToPopulate[section] === 'string')
			for (const variable in variables) performVariableReplacement(blockToPopulate, section, variables, variable);
		else if (Array.isArray(blockToPopulate[section])) blockToPopulate[section] = populateVariables(block[section], variablesToUse);
		else if (typeof blockToPopulate[section] === 'object') blockToPopulate[section] = populateVariables(block[section], variablesToUse);
	}
	return blockToPopulate;
}