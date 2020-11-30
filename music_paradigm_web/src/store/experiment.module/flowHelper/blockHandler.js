import experimentStoreState from '../state'

export default {
    getCurrentBlock,
    getCurrentBlockType,
    getNextBlockType
}

function getCurrentBlockType(flow, cursor) {
    return flow[cursor.current.index].type;
}

function getNextBlockType(flow, cursor) {
    return flow[cursor.navigation.indexNext].type;
}

function getCurrentBlock(flow, cursor) {

    let currentBlock = flow[cursor.current.index];
    const {
        lastRepetitionVersion,
    } = currentBlock;

    if (lastRepetitionVersion && (cursor.navigation.numberRepetition <= 1))
        currentBlock = lastRepetitionVersion;

    return populateVariables(currentBlock);
}

function populateVariables(block) {
    const variables = experimentStoreState.variables;
    const blocToUse = JSON.parse(JSON.stringify(block));
    for (let section in blocToUse) {
        if (typeof blocToUse[section] === 'string') {
            for (let variable of variables.variables) blocToUse[section].replace(variable.name, variable.value);
            for (let counter of variables.counters) blocToUse[section].replace(counter.name, counter.value);
        }
    }
    return blocToUse;
    // return block;
}