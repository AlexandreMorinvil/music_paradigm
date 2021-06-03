import defaultState from './default-state';

import blockHandler from './block-handler';
import stateHandler from './state-handler';
import variableHandler from './variable-handler';

export default {
	countStepsLeft,
	assignCursor,
	advance,
	goBack,
	skip,
};

function countStepsLeft(flow, startPointCursor) {
	// Deep copy the cursor (or initialize the cursor at the start by default)
	const stepTracerCursor = assignCursor(flow, startPointCursor);
	let stepsCounter = 0;

	while (!stepTracerCursor.flag.isBeyondEnd && !(blockHandler.getCurrentBlockType(flow, stepTracerCursor) === 'end')) {
		moveCursorNext(flow, stepTracerCursor);
		stepsCounter += 1;
	}
	return Math.max(0, stepsCounter);
}

function assignCursor(flow, cursorToCopy = null) {
	if (cursorToCopy) {
		return JSON.parse(JSON.stringify(cursorToCopy));
	} else {
		const defaultCursor = defaultState.DEFAULT_EXPERIMENT_STATE_CURSOR_VALUES();
		updateCursorNavigation(flow, defaultCursor);
		return defaultCursor;
	}
}

function advance(state, flow, cursor, isInitialized) {
	determineGroupEnd(flow, cursor);
	if (moveCursorSpecialCases(state, flow, cursor, isInitialized)) return;
	else moveCursorNext(flow, cursor, isInitialized);
}

function goBack(flow, cursor, isInitialized) {
	determineGroupEnd(flow, cursor);
	moveCursorBack(flow, cursor, isInitialized);
}

function skip(state, flow, cursor, isInitialized) {
	if (moveCursorSpecialCases(state, flow, cursor, isInitialized)) return;
	do {
		moveCursorNext(flow, cursor, isInitialized);
		stateHandler.updateStateOnSkip(state, flow, cursor, isInitialized);
	} while (cursor.current.isInSkipableChain);
}

// Inner cursor move manipulations
function moveCursorSpecialCases(state, flow, cursor, isInitialized) {
	if (state.record.successesInLoop >= blockHandler.getCurrentBlock(flow, cursor).successesForSkipLoop) {
		moveCursorSkipRepetions(state, flow, cursor, isInitialized);
		return true;
	} else if (blockHandler.getCurrentBlock(flow, cursor).skipLoopOnLastRepetition && cursor.current.numberRepetition <= 1) {
		moveCursorSkipRepetions(state, flow, cursor, isInitialized);
		return true;
	} else return false;
}

function moveCursorNext(flow, cursor, isInitialized) {
	variableHandler.updateVariables(flow, cursor);
	performCursorDisplacementForward(flow, cursor, isInitialized);
	updateCursorNavigation(flow, cursor);
}

function moveCursorBack(flow, cursor, isInitialized) {
	variableHandler.updateVariables(flow, cursor);
	performCursorDisplacementBackward(cursor, isInitialized);
	updateCursorNavigation(flow, cursor);
}

function moveCursorSkipRepetions(state, flow, cursor, isInitialized) {
	do {
		moveCursorNext(flow, cursor, isInitialized);
		stateHandler.updateStateOnSkip(state, flow, cursor, isInitialized);
	} while (!cursor.flag.needsResetLoopParameters);
}

function performCursorDisplacementForward(flow, cursor, isInitialized = {}) {
	let needsResetLoopParameters = false;

	// Moving to the next inner step if there remains inner steps
	if (cursor.current.innerStepIndex < cursor.navigation.lastInnerStepsIndex) {
		cursor.current.innerStepIndex += 1;
		cursor.flag.isNewBlock = false;
		Object.assign(isInitialized, { content: false });
	}

	// Moving to a new block
	else if (cursor.navigation.indexNext < flow.length) {
		cursor.current.innerStepIndex = 0;

		// If the index of the next block is lower than or equal to the index of the current block, this means that we are looping
		if (cursor.navigation.indexNext <= cursor.current.index) {
			cursor.flag.isFirstIndexPassage = false;

			if (cursor.current.numberRepetition > 1) {
				cursor.current.numberRepetition -= 1;
			} else if (cursor.navigation.lastPiledContentIndex > 1) {
				cursor.navigation.lastPiledContentIndex -= 1;
				cursor.current.piledContentIndex += 1;
				needsResetLoopParameters = true; // Flag asjustment
			}
		}

		// Otherwise, if the next step is beyond a group of blocks, we reset the piled content index
		else if (cursor.navigation.indexNext > cursor.navigation.indexGroupEnd) {
			cursor.flag.isFirstIndexPassage = true;
			cursor.current.piledContentIndex = 0;
			needsResetLoopParameters = cursor.navigation.indexNext > cursor.navigation.indexGroupEnd; // Flag asjustment
		}

		// Indicate that we just moved in a new block
		cursor.flag.isNewBlock = true;

		// We move the current intdex to the next step
		cursor.current.index = cursor.navigation.indexNext;
		Object.assign(isInitialized, defaultState.IS_FULLY_NOT_INITIALIZED_STATUS());
	}

	// Moving beyond the last block of the flow
	else {
		cursor.flag.isBeyondEnd = true;
		Object.assign(isInitialized, defaultState.IS_FULLY_NOT_INITIALIZED_STATUS());
	}

	// Adjust the flags
	cursor.flag.needsResetLoopParameters = needsResetLoopParameters;
}

// THe backward mobility only exists for inner steps
function performCursorDisplacementBackward(cursor, isInitialized = {}) {
	// By moving backward, we are necessarily not beyond the last step
	cursor.flag.isBeyondEnd = false;

	// Moving to the previous inner step if there remains inner steps
	if (cursor.current.innerStepIndex > 0) {
		cursor.current.innerStepIndex -= 1;
		cursor.current.innerStepIndex = Math.max(0, cursor.current.innerStepIndex);
		Object.assign(isInitialized, { content: false });
	}
}

function updateCursorNavigation(flow, cursor) {
	// Parsing the block's flow navigation parameters
	const currentBlock = blockHandler.getCurrentBlock(flow, cursor);
	const {
		// Content arrays
		textContent,
		pictureFileName,
		midiFileName,
		videoFileName,
		referenceKeyboardKeys,

		// Cursor parameters
		numberRepetition,
		followedBy,
		isInSkipableChain,
	} = currentBlock;

	// Set the current index parameter
	cursor.current.isInSkipableChain = typeof isInSkipableChain === 'boolean' ? isInSkipableChain : false;

	// Set all the navigation parameters
	setCursorInnerStepsTotal(cursor, textContent, pictureFileName);
	setCursorLoopStart(cursor, numberRepetition);
	setCursorMediaDepilingStart(cursor, midiFileName, videoFileName, textContent, pictureFileName, referenceKeyboardKeys);
	setCursorNextStep(cursor, followedBy);
}

function setCursorInnerStepsTotal(cursor, textContent, pictureFileName) {
	let innerStepsTextContent = defaultState.UNSET_INDEX;
	if (Array.isArray(textContent)) {
		const currentTextContent = textContent[cursor.current.piledContentIndex];
		innerStepsTextContent = Array.isArray(currentTextContent) ? currentTextContent.length - 1 : defaultState.UNSET_INDEX;
	}

	let innerStepsPictureFile = defaultState.UNSET_INDEX;
	if (Array.isArray(pictureFileName)) {
		const currentPictureFile = pictureFileName[cursor.current.piledContentIndex];
		innerStepsPictureFile = Array.isArray(currentPictureFile) ? currentPictureFile.length - 1 : defaultState.UNSET_INDEX;
	}

	const maxNumberContentElement = Math.max(innerStepsTextContent, innerStepsPictureFile);
	cursor.navigation.lastInnerStepsIndex = maxNumberContentElement;
}

// Let A, B, C and D be three blocks, that are not instruction blocks.
//
//              A                           B                           C                           D
//  -------------------------   -------------------------   -------------------------   -------------------------
//  | type: XYZ             |   | type: XYZ             |   | type: XYZ             |   | type: XYZ             |
//  |           ...         |   |           ...         |   |           ...         |   |           ...         |
//  | numberRepetition: 3   |   |                       |   | numberRepetition: 3   |   |                       |
//  | folloedBy: true       |   | folloedBy: true       |   |                       |   |                       |
//  -------------------------   -------------------------   -------------------------   -------------------------
//
//  The execution order would be :
//  A - B - C - A - B - C - A - B - C - C - C - D
function setCursorLoopStart(cursor, numberRepetition) {
	if (cursor.flag.needsResetLoopParameters) cursor.navigation.totalNumberRepetitions = 1;
	// Initialize a loop (loop start index & number of repetitions) if :
	// 1. A number of repetition greater than 1 is specified in the block's settings,
	// 2. The cursor is not currently in a loop (thus the number of reptition left is <= 1)
	// 3. The current index is not the start index of a previous loop (to avoid resetting a loop twice)
	if (numberRepetition > 1 && cursor.current.numberRepetition <= 1 && cursor.current.index !== cursor.navigation.indexLoopStart) {
		cursor.navigation.totalNumberRepetitions = numberRepetition;
		cursor.navigation.indexLoopStart = cursor.current.index;
		cursor.current.numberRepetition = numberRepetition;
	}
}

// The cursor will loop to the start of the pile and use the content corresponding to the index named "piledContentIndex"
// Let A, B, C and D be three blocks, that are not instruction blocks.
//
//              A                                   B                               C                               D
//  ------------------------------  ------------------------------  ------------------------------  ------------------------------
//  | type: XYZ                  |  | type: XYZ                  |  | type: XYZ                  |  | type: XYZ                  |
//  |           ...              |  |           ...              |  |           ...              |  |           ...              |
//  | midiFileName: [0, 1]       |  | midiFileName: [0, 1]       |  | midiFileName: [0, 1, 2]    |  | midiFileName: [0, 1, 2]    |
//  | videoFileName: [0, 1]      |  | videoFileName: [0, 1]      |  | videoFileName: [0, 1, 2, 3]|  | videoFileName: [0, 1, 2]   |
//  | folloedBy: true            |  | folloedBy: true            |  |                            |  |                            |
//  ------------------------------  ------------------------------  ------------------------------  ------------------------------
//
//  The execution order would be :
//  A[0] - B[0] - C[0] - A[1] - B[1] - C[1] - D[0] - D[1] - D[2]
function setCursorMediaDepilingStart(cursor, midiFileName, videoFileName, textContent, pictureFileName, referenceKeyboardKeys) {
	// Count the number of piled media elements of each type and detemine the maximum number of piled content.
	const numberMidiFiles = Array.isArray(midiFileName) ? midiFileName.length : 0;
	const numberVideoFiles = Array.isArray(videoFileName) ? videoFileName.length : 0;
	const numberTextContent = Array.isArray(textContent) ? textContent.length : 0;
	const numberPictureFile = Array.isArray(pictureFileName) ? pictureFileName.length : 0;
	const numberReferenceKeyboardKeys = Array.isArray(referenceKeyboardKeys) ? referenceKeyboardKeys.length : 0;

	const maxNumberContentElement = Math.max(numberMidiFiles, numberVideoFiles, numberTextContent, numberPictureFile, numberReferenceKeyboardKeys);

	// Initialize the number of piled media content (playable media pile index & number of medias) if :
	// 1. There is more than one media content element (midi/video) (so the total index > 1),
	// 2. The cursor is not currently depiling a content pile (thus the number of piled content left is 1 or 0)
	// 3. The current index is not the start index of a previous pile (to avoid depiling a pile twice)
	// 4. The current index is beyond the loop end (in order to not start a loop of depilement within a group of blocks)
	if (
		maxNumberContentElement > 1 &&
		cursor.navigation.lastPiledContentIndex <= 1 &&
		cursor.current.index !== cursor.navigation.indexPileStart &&
		cursor.current.index > cursor.navigation.indexGroupEnd
	) {
		cursor.navigation.indexPileStart = cursor.current.index;
		cursor.navigation.lastPiledContentIndex = maxNumberContentElement;
	}
}

function setCursorNextStep(cursor, followedBy) {
	// Updating the next index
	// If the block is followed by the next block, we will necessarily go to the next block and we know that we are within a group of blocks
	if (followedBy) {
		cursor.navigation.indexNext = cursor.current.index + 1;
	}

	// If the block is not followed by another block, it is necesserily the end of a group of blocks
	// If there remains reptitions: We loop back to the start of the loop
	else if (cursor.current.numberRepetition > 1) {
		cursor.navigation.indexNext = cursor.navigation.indexLoopStart;
	}

	// If there remains content to depile, reset the loop start in order to be able to loop again with the new media content
	else if (cursor.navigation.lastPiledContentIndex > 1) {
		cursor.navigation.indexNext = cursor.navigation.indexPileStart;
		cursor.navigation.indexLoopStart = defaultState.UNSET_INDEX;
	}

	// By default, the next block is the following block
	else {
		cursor.navigation.indexNext = cursor.current.index + 1;
	}
}

function determineGroupEnd(flow, cursor) {
	const cursorCopy = assignCursor(flow, cursor);
	while (blockHandler.getCurrentBlock(flow, cursorCopy).followedBy && !cursorCopy.flag.isBeyondEnd) {
		moveCursorNext(flow, cursorCopy);
	}
	cursor.navigation.indexGroupEnd = cursorCopy.current.index;
}
