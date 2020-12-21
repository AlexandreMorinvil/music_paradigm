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
	const blocToUse = JSON.parse(JSON.stringify(block));
	for (const section in blocToUse) {
		if (typeof blocToUse[section] === 'string') {
			for (const variable in variables.variables) blocToUse[section] = blocToUse[section].replace(variable, variables.value[variable]);
		} else if (Array.isArray(blocToUse[section])) {
			for (const index in blocToUse[section]) {
				if (typeof blocToUse[section][index] === 'string') {
					for (const variable in variables.value) blocToUse[section][index] = blocToUse[section][index].replace(variable, variables.value[variable]);
				} else if (Array.isArray(blocToUse[section][index])) {
					for (const subIndex in blocToUse[section][index]) {
						if (typeof blocToUse[section][index][subIndex] === 'string') {
							for (const variable in variables.value)
								blocToUse[section][index][subIndex] = blocToUse[section][index][subIndex].replace(variable, variables.value[variable]);
						}
					}
				}
			}
		}
	}
	return blocToUse;
}
