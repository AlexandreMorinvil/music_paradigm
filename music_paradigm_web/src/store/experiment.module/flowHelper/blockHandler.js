import experimentStoreState from '../state';

export default {
	getCurrentBlock,
	getCurrentBlockType,
	getNextBlockType,
};

function getCurrentBlockType(flow, cursor) {
	return flow[cursor.current.index].type;
}

function getNextBlockType(flow, cursor) {
	return flow[cursor.navigation.indexNext].type;
}

function getCurrentBlock(flow, cursor) {
	let currentBlock = flow[cursor.current.index];
	const { lastRepetitionVersion } = currentBlock;

	if (lastRepetitionVersion && cursor.navigation.numberRepetition <= 1) {
		currentBlock = lastRepetitionVersion;
	}

	return populateVariables(currentBlock);
}

function populateVariables(block) {
	const variables = experimentStoreState.variables;
	const blockToUse = JSON.parse(JSON.stringify(block));
	for (const section in blockToUse) {
		if (typeof blockToUse[section] === 'string')
			for (const variable in variables.value) blockToUse[section] = blockToUse[section].replace(variable, variables.value[variable]);
		else if (Array.isArray(blockToUse[section])) blockToUse[section] = populateVariables(block[section]);
	}
	return blockToUse;
}
