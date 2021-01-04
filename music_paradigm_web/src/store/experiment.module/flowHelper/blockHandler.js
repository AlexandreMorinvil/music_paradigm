import experimentStoreState from '../state';
import variableHandler from './variableHandler';

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
	const { lastRepetitionVersion, succeeededForSkipLoopVersion } = currentBlock;

	if (lastRepetitionVersion && cursor.navigation.numberRepetition <= 1) {
		currentBlock = lastRepetitionVersion;
	} else if (succeeededForSkipLoopVersion && experimentStoreState.state.record.successesInLoop >= currentBlock.successesForSkipLoop) {
		const { successesForSkipLoop } = currentBlock;
		currentBlock = succeeededForSkipLoopVersion;
		currentBlock.successesForSkipLoop = successesForSkipLoop;
	}

	return variableHandler.populateVariables(currentBlock);
}
