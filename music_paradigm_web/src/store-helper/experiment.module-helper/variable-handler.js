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
 * @param {Boolean} isForConstants	Indicate if the dynamic or constant variables must be populated
 * @returns {Object} 				Block with the variables populated
 */
function populateVariables(block, isForConstants = false) {

	// Get the up to date list of variables
	updateStateVariables();
	const variablesInformation = experimentStoreState.variablesInformation;
	const { variables } = variablesInformation;

	// Clone the block and populate it
	let blockToPopulate = JSON.parse(JSON.stringify(block));

	// Verify if the is any sign that might lead to a variable replacement
	const blockString = JSON.stringify(blockToPopulate);
	if (!blockString.includes('$') && !blockString.includes('&')) return blockToPopulate;

	// Variable replacement
	for (const variableName in variables) {
		// Verify if the variable in question is suposed to be populated givent hte isForConstants paramter 
		if (variables[variableName].isConstant !== isForConstants) continue;
		const conversionRules = generateConversionRules(variableName, variablesInformation);
		blockToPopulate = performVariableReplacement(blockToPopulate, conversionRules);
	}
	return blockToPopulate;
}

function generateConversionRules(variableName, variablesInformation) {

	// Retreive the variable
	const conversions = {};
	const variable = variablesInformation.variables[variableName];
	const schedule = variablesInformation.schedules[variable.scheduleName];
	const optionValues = [variable.currentValue, ...variable.optionValues];

	// Construct variable reference (state variables are wrapped with "&" signs and other variables with "$")
	let variableReference = '';
	if (variable.isStateVariable) variableReference = wrapStateVariableName(variableName);
	else variableReference = wrapVariableName(variableName);

	// Construct the conversion table
	let randomIndex  = 0;
	switch (variable.valueSelectionType) {
		case 'scheduled':
			conversions[addVariableScheduleIndex(variableReference, 0)] = variable.currentValue;
			schedule.forEach((optionValueChoice, index) => {
				const hasChosenOptionValue = optionValueChoice <= optionValues.length;
				const reference = addVariableScheduleIndex(variableReference, index + 1);
				conversions[reference] = hasChosenOptionValue ? optionValues[optionValueChoice] : variable.currentValue;
			});
			break;

		case 'random':
			randomIndex = Math.floor(Math.random() * 1000) % optionValues.length;
			conversions[variableReference] = optionValues[randomIndex];
			break;

		default:
			conversions[variableReference] = variable.currentValue;
			break;
	}
	return conversions;
}

function performVariableReplacement(block, conversionRules) {

	// Perform the conversion
	let stringBlock = JSON.stringify(block);
	for (const reference in conversionRules)
		stringBlock = stringBlock.replace(reference, conversionRules[reference]);

	// Parse the converted block
	block = JSON.parse(stringBlock);
	block = transformSpecialAttributes(block);

	return block;
}

function transformSpecialAttributes(block) {
	for (const attribute in block) {
		if (typeof block[attribute] !== 'string') continue;
		if (block[attribute] === 'null') block[attribute] = null;					// null
		else if (block[attribute] === 'true') block[attribute] = true;				// Boolean true
		else if (block[attribute] === 'false') block[attribute] = false;			// Boolean false
		else if (!isNaN(block[attribute]) && (/-?[0-9]*?/i).test(block[attribute]))	// Numbers
			block[attribute] = Number(block[attribute]);

		else if (typeof block[attribute] === 'object' || Array.isArray(block[attribute]))	// Recursive call for arrays and objects
			block[attribute] = transformSpecialAttributes(block[attribute]);
	}
	return block;
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
	const { variables } = experimentStoreState.variablesInformation;
	if (!variables) return;
	variables[variableName].currentValue = variables.initialValue;
}

function incrementVariableValue(variableName) {
	const { variables } = experimentStoreState.variablesInformation;
	if (!variables) return;
	variables[variableName].currentValue += 1;
}

function decrementVariableValue(variableName) {
	const { variables } = experimentStoreState.variablesInformation;
	if (!variables) return;
	variables[variableName].currentValue -= 1;
}

function setStateVariable(value) {
	return {
		initialValue: null,
		currentValue: value,
		imposedValue: null,
		isConstant: false,
		isStateVariable: true,
		optionValues: [],
		valueSelectionType: 'fixed',
		schedule: null
	};
}

function updateStateVariables() {
	const stateVariables = experimentStoreState.variablesInformation.variables;
	stateVariables['REPETITIONS_CURRENT'] = setStateVariable(experimentStoreState.cursor.navigation.totalNumberRepetitions - experimentStoreState.cursor.current.numberRepetition + 1);
	stateVariables['REPETITIONS_LEFT'] = setStateVariable(experimentStoreState.cursor.current.numberRepetition);
	stateVariables['SUCCESSES_IN_LOOP'] = setStateVariable(experimentStoreState.state.record.successesInLoop);
}

function wrapVariableName(variableName) {
	return '$' + variableName + '$';
}

function wrapStateVariableName(stateVariableName) {
	return '&' + stateVariableName + '&';
}

function addVariableScheduleIndex(variableReference, index) {
	return variableReference + '@' + index + '@';
}
