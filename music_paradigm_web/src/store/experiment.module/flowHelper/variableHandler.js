import experimentStoreState from '../state'

export default {
    resetVariable,
    incrementeVariable,
    decrementeVariable,
}

function resetVariable(variableName) {
    variableName = wrapVariableName(variableName);
    if (experimentStoreState.variables.variables[variableName])
        experimentStoreState.variables.variables[variableName] += 1;
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