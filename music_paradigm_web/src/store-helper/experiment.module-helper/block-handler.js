import defaultBlock from './default-block';
import variableHandler from './variable-handler';

import experimentStoreState from '@/store/experiment.module/state';

export default {
	getCurrentBlock,
	getCurrentBlockType,
	getTimeUpBlock,
};

function getCurrentBlockType(flow, cursor) {
	return getCurrentBlock(flow, cursor).type;
}

function getCurrentBlock(flow, cursor) {
	// If we are beyond the end, we return an end block
	if (flow.length <= 0) return defaultBlock.DEFAULT_END();
	if (cursor.flag.isBeyondEnd) return defaultBlock.DEFAULT_END();

	// If we are within the flow, we return the block pointed by the cursor
	// or re return a nested block version of the block in pointed
	let currentBlock = flow[cursor.current.index];
	const { lastRepetitionVersion, succeeededForSkipLoopVersion } = currentBlock;

	// Verify if there is a 'last repetition version' block within the block
	if (lastRepetitionVersion && cursor.current.numberRepetition <= 1) {
		currentBlock = lastRepetitionVersion;
	}

	// Verify if there is a 'suceeded for skip loop' version within the block 
	else if (succeeededForSkipLoopVersion && experimentStoreState.state.record.successesInLoop >= currentBlock.successesForSkipLoop) {
		const { successesForSkipLoop } = currentBlock;
		currentBlock = succeeededForSkipLoopVersion;
		currentBlock.successesForSkipLoop = successesForSkipLoop;
	}

	// We make sure to update the variables of the block
	return variableHandler.populateVariables(currentBlock);
}

function getTimeUpBlock(hasBlocksAfter = false) {
	const timeUpBlock = experimentStoreState.timeUpState || defaultBlock.DEFAULT_TIME_UP();
	if (hasBlocksAfter && timeUpBlock.type === 'end') timeUpBlock.type = 'instruction';
	return timeUpBlock;
}
