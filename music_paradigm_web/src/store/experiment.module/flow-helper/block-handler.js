import defaultState from './default-block';
import experimentStoreState from '../state';
import variableHandler from './variable-handler';

export default {
	getCurrentBlock,
	getCurrentBlockType,
	getNextBlockType,
	getNextBlock,
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

	if (cursor.current.isBeyondEnd) {
		if (cursor.flag.isInPrelude) currentBlock = defaultState.DEFAULT_IMPOSED_TRANSITION();
		else currentBlock = defaultState.DEFAULT_END();
	} else if (lastRepetitionVersion && cursor.navigation.numberRepetition <= 1) {
		currentBlock = lastRepetitionVersion;
	} else if (succeeededForSkipLoopVersion && experimentStoreState.state.record.successesInLoop >= currentBlock.successesForSkipLoop) {
		const { successesForSkipLoop } = currentBlock;
		currentBlock = succeeededForSkipLoopVersion;
		currentBlock.successesForSkipLoop = successesForSkipLoop;
	}

	return variableHandler.populateVariables(currentBlock);
}

function getNextBlock(flow, cursor) {
	return flow[cursor.navigation.indexNext];
}
