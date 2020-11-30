import experimentStoreState from '../state'

export default {
    updateVariables
}

function updateVariables(flow, cursor) {
    // Parsing the current block's state settings
    const currentBlock = blockHandler.getCurrentBlock(flow, cursor)
    const {
        resetVariableValue,
        incrementVariable,
        decrementVariable,
        incrementVariableOnSucess,
        decrementVariableOnSucces,
    } = currentBlock;

    if (resetVariableValue) variableHandler.resetVariable(resetVariableValue);

    if (incrementVariable) variableHandler.incrementeVariable(incrementVariable);
    else if (currentState.record.isSuccess && incrementVariableOnSucess) variableHandler.incrementeVariable(incrementVariableOnSucess);

    if (decrementVariable) variableHandler.decrementeVariable(decrementVariable);
    else if (currentState.record.isSuccess && decrementVariableOnSucces) variableHandler.decrementeVariable(decrementVariableOnSucces);
}


function resetVariable(variableName) {
    variableName = wrapVariableName(variableName);
    const specifiedVariable = experimentStoreState.variables.variables[variableName].filter(e => e.Name === variableName);
    if (specifiedVariable)
        experimentStoreState.variables.variables[variableName] = specifiedVariable;
}

function incrementeVariable(variableName) {
    variableName = wrapVariableName(variableName);
    if (experimentStoreState.variables.variables[variableName])
        experimentStoreState.variables.variables[variableName] += 1;
}

function decrementeVariable(variableName) {
    variableName = wrapVariableName(variableName);
    if (experimentStoreState.variables.variables[variableName])
        experimentStoreState.variables.variables[variableName] -= 1;
}

function wrapVariableName(variableName) {
    return "$" + variableName + "$";
}