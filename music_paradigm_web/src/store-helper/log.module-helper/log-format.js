import { account } from '@/store/account.module';
import { experiment } from '@/store/experiment.module';
import { session } from '@/store/session.module';

import { evaluation } from '@/store/evaluation.module';
import { keyboard } from '@/store/keyboard.module';
import { piano } from '@/store/piano.module';

export default {
	makeSimpleLogBlock,
	makeThoroughLogHeader,
	makeThoroughLogBlock,
	makeThoroughLogConclusion,
};

// Access the getters of the store modules used
const gettersAccount = account.getters;
const gettersExperiment = experiment.getters;
const gettersSession = session.getters;

const gettersEvaluation = evaluation.getters;
const gettersKeyboard = keyboard.getters;
const gettersPiano = piano.getters;

// Access the states associated (where the information is stored)
const stateAccount = account.state;
const stateExperiment = experiment.state;
const stateSession = session.state;

const stateEvaluation = evaluation.state;
const stateKeyboard = keyboard.state;
const statePiano = piano.state;

/**
 * Simple-Log
 * Simple-Log format is summarized as follow :
 *
 * 	Simple-Log 1 : [Information about performance]
 * 	Simple-Log 2 : [Information about performance]
 * 	Simple-Log 3 : [Information about performance]
 * 	...
 *
 * Each Simple-Log block contains the information about the session to which it is associated.
 * The Simple-Log format does not provide the full story of how a session happened.
 * Only the information about the performances or the required inputs of the user are recorded.
 * Simple-Log blocks are (generally) only generated for "playing", "survey" and "writting" states.
 */

/**
 * Create a block for a Simple-Log format
 *
 * A Simple-Log block is made of the attributes of the following Object types :
 *  - Simple_Log_Block_General_Information
 *  - Simple_Log_Block_Performance_Information
 *
 * @returns {Simple_Log_Block}
 */
function makeSimpleLogBlock() {
	const block = {};
	Object.assign(block, makeSimpleLogBlockGeneralInformation());
	Object.assign(block, makeSimpleLogBlockPerformanceInformation());
	return block;
}

/**
 * Gather the information of general interest for a block fo Simple-Log format
 * @returns {Simple_Log_Block_General_Information}
 */
function makeSimpleLogBlockGeneralInformation() {
	return {
		userId: gettersAccount.accountId(stateAccount),
		experimentId: gettersExperiment.experimentId(stateExperiment),
		curriculumId: gettersSession.curriculumId(stateSession) || null,
		progressionId: gettersSession.progressionId(stateSession) || null,
		associativeId: gettersSession.associativeId(stateSession) || null,
		associativeIdOrdinalNumber: gettersSession.associativeIdOrdinalNumber(stateSession) || null,
		logLabel: gettersExperiment.logLabel(stateExperiment),

		startCount: gettersSession.startCount(stateSession),
		completionCount: gettersSession.completionCount(stateSession),

		username: gettersAccount.username(stateAccount),
		curriculumTitle: gettersSession.curriculumTitle(stateSession) || null,
		experimentGroup: gettersExperiment.experimentGroup(stateExperiment),
		experimentName: gettersExperiment.experimentName(stateExperiment),
		experimentVersion: gettersExperiment.experimentVersion(stateExperiment),

		blockType: gettersExperiment.currentStateType(stateExperiment),
		blockSubType: gettersExperiment.playingMode(stateExperiment),
		controlType: gettersExperiment.controlType(stateExperiment),
		index: gettersExperiment.currentIndex(stateExperiment),
		innerStepIndex: gettersExperiment.currentInnerStepIndex(stateExperiment),
		repetition: gettersExperiment.currentRepetition(stateExperiment),
		isInPrelude: gettersExperiment.isInPrelude(stateExperiment),
		timestamp: Date.now(),
	};
}

/**
 * Gather the information of relative to the performance for a block fo Simple-Log format
 * @returns {Simple_Log_Block_Performance_Information}
 */
function makeSimpleLogBlockPerformanceInformation() {
	const controlType = gettersExperiment.controlType(stateExperiment);
	const performanceLog = {};
	switch (controlType) {
		case 'piano':
			Object.assign(performanceLog, gettersPiano.pianoSimpleLogSummary(statePiano));
			Object.assign(performanceLog, gettersPiano.pianoSimpleLogPreprocesed(statePiano));
			performanceLog.grades = gettersEvaluation.grades(stateEvaluation);
			break;
		case 'keyboard':
			Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogSummary(stateKeyboard));
			Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogPreprocesed(stateKeyboard));
			break;
		default:
			break;
	}
	return performanceLog;
}

/**
 * Thorough-Log
 * Thorough-Log format is summarized as follow :
 *
 * 	Thorough-Log :
 * 	{
 * 		Header,
 * 		Blocks : [
 * 			Block1,
 * 			Block2,
 * 			Block3,
 * 			...
 * 		],
 * 		Conclusion
 * 	}
 *
 * The header contains the general information about the session.
 * The blocks contain the information about each state during the session.
 * The conclusion contain the information about when the experiment session ended.
 */

/**
 * Gather the information for the header of a Thorough-Log
 * @returns {Thorough_Log_Header}
 */
function makeThoroughLogHeader(targetLogLabel) {
	return {
		userId: gettersAccount.accountId(stateAccount),
		experimentId: gettersExperiment.experimentId(stateExperiment),
		curriculumId: gettersSession.curriculumId(stateSession) || null,
		progressionId: gettersSession.progressionId(stateSession) || null,
		associativeId: gettersSession.associativeId(stateSession) || null,
		associativeIdOrdinalNumber: gettersSession.associativeIdOrdinalNumber(stateSession) || 0,
		logLabel: targetLogLabel || gettersExperiment.logLabel(stateExperiment),

		completionCount: gettersSession.completionCount(stateSession),

		username: gettersAccount.username(stateAccount),
		curriculumTitle: gettersSession.curriculumTitle(stateSession) || null,
		experimentGroup: gettersExperiment.experimentGroup(stateExperiment),
		experimentName: gettersExperiment.experimentName(stateExperiment),
		experimentVersion: gettersExperiment.experimentVersion(stateExperiment),
		startTimestamp: Date.now(),
	};
}

/**
 * Create a block for a Thorough-Log
 *
 * A Thorough-Log block is made of the attributes of the following Object types :
 *  - Thorough_Log_Block_General_Information
 *  - Thorough_Log_Block_Performance_Information
 *
 * @returns {Thorough_Log_Block}
 */
function makeThoroughLogBlock() {
	const block = {};
	Object.assign(block, makeThoroughLogBlockGeneralInformation());
	Object.assign(block, makeSimpleBlockPerformanceInformation());
	return block;
}

/**
 * Gather the information of relative to the performance for a block for Thorough-Log format
 * @returns {Thorough_Log_Block_General_Information}
 */
function makeThoroughLogBlockGeneralInformation() {
	return {
		startCount: gettersSession.startCount(stateSession),

		blockType: gettersExperiment.currentStateType(stateExperiment),
		blockSubType: gettersExperiment.playingMode(stateExperiment),
		controlType: gettersExperiment.controlType(stateExperiment),
		index: gettersExperiment.currentIndex(stateExperiment),
		innerStepIndex: gettersExperiment.currentInnerStepIndex(stateExperiment),
		repetition: gettersExperiment.currentRepetition(stateExperiment),
		isInPrelude: gettersExperiment.isInPrelude(stateExperiment),
		timestamp: Date.now(),

		textContent: gettersExperiment.textContent(stateExperiment),
		pictureName: gettersExperiment.pictureName(stateExperiment),
		helperImageName: gettersExperiment.helperImageName(stateExperiment),
	};
}

/**
 * Gather the information of relative to the performance for a block for Thorough-Log format
 * @returns {Thorough_Log_Block_Performance_Information}
 */
function makeSimpleBlockPerformanceInformation() {
	const performanceLog = {};
	Object.assign(performanceLog, gettersPiano.pianoSimpleLogSummary(statePiano));
	Object.assign(performanceLog, gettersPiano.pianoSimpleLogPreprocesed(statePiano));
	Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogSummary(stateKeyboard));
	Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogPreprocesed(stateKeyboard));
	return performanceLog;
}

/**
 * Gather the information for the conclusion of a Thorough-Log
 * @returns {Thorough_Log_Conclusion}
 */
function makeThoroughLogConclusion(isInTimeUp = false, newLogLabel) {
	return {
		time: Date.now(),
		isInTimeUp: isInTimeUp,
		nextLogLabel: newLogLabel,
	};
}
