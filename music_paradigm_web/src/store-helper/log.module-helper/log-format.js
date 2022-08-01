import { account } from '@/store/account.module';
import { experiment } from '@/store/experiment.module';
import { session } from '@/store/session.module';

import { evaluation } from '@/store/evaluation.module';
import { keyboard } from '@/store/keyboard.module';
import { piano } from '@/store/piano.module';

import { glt } from '@/store/glt.module';
import { pvt } from '@/store/pvt.module';
import { question } from '@/store/question.module';
import { survey } from '@/store/survey.module';
import { writting } from '@/store/writting.module';

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

const gettersGlt = glt.getters;
const gettersPvt = pvt.getters;
const gettersQuestion = question.getters;
const gettersSurvey = survey.getters;
const gettersWritting = writting.getters;

// Access the states associated (where the information is stored)
const stateAccount = account.state;
const stateExperiment = experiment.state;
const stateSession = session.state;

const stateEvaluation = evaluation.state;
const stateKeyboard = keyboard.state;
const statePiano = piano.state;

const stateGlt = glt.state;
const statePvt = pvt.state;
const stateQuestion = question.state;
const stateSurvey = survey.state;
const stateWritting = writting.state;

/**
 * Simple-Log
 * Simple-Log format is summarized as follow :
 *
 * 	Simple-Log Block 1 : { Information about performance }
 * 	Simple-Log Block 2 : { Information about performance }
 * 	Simple-Log Block 3 : { Information from survey }
 *  Simple-Log Block 4 : { Information from written input }
 * 	...
 *
 * Each Simple-Log block contains the information about the session to which it is associated.
 * The Simple-Log format does not provide the full story of how a session happened.
 * Only the information about the performances or the required inputs of the user are recorded.
 * Simple-Log blocks are (generally) only generated for "playing", "pvt", "survey" and "writting" states.
 */

/**
 * Create a block for a Simple-Log format
 *
 * A Simple-Log block is made of the attributes of the following Object types :
 *  - Simple_Log_Block_General_Information
 *  - Simple_Log_Block_Performance_Information OR Log_Block_Survey_Answers OR Log_Block_Writting_Answer
 *
 * @returns {Simple_Log_Block}
 */
function makeSimpleLogBlock() {
	// Block construction helper
	const blockType = gettersExperiment.currentStateType(stateExperiment);

	// Block construction
	const block = {};
	Object.assign(block, makeSimpleLogBlockGeneralInformation());
	Object.assign(block, makeSimpleLogBlockPerformanceInformation());
	if (blockType === 'survey') Object.assign(block, makeLogBlockSurveyAnswers());
	if (blockType === 'witting') Object.assign(block, makeLogBlockWrittenAnswer());
	if (blockType === 'question') Object.assign(block, makeLogBlockQuestionAnswer());
	if (blockType === 'pvt') Object.assign(block, makeLogBlockPvtResults());
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
		associativeIdOrdinalNumber: gettersSession.associativeIdOrdinalNumber(stateSession) || 0,
		logLabel: gettersExperiment.logLabel(stateExperiment),
		logTags: gettersSession.tags(stateSession),

		startCount: gettersSession.startCount(stateSession),
		completionCount: gettersSession.completionCount(stateSession),

		username: gettersAccount.username(stateAccount),
		curriculumTitle: gettersSession.curriculumTitle(stateSession) || null,
		experimentGroup: gettersExperiment.experimentGroup(stateExperiment),
		experimentName: gettersExperiment.experimentName(stateExperiment),
		experimentVersion: gettersExperiment.experimentVersion(stateExperiment),

		blockType: gettersExperiment.currentStateType(stateExperiment),
		blockSubType: gettersExperiment.currentStateSubtype(stateExperiment),
		controlType: gettersExperiment.controlType(stateExperiment),
		index: gettersExperiment.currentIndex(stateExperiment),
		innerStepIndex: gettersExperiment.currentInnerStepIndex(stateExperiment),
		repetition: gettersExperiment.currentRepetition(stateExperiment),
		isInPrelude: gettersExperiment.isInPrelude(stateExperiment),
		isInConclusion: gettersExperiment.isInConclusion(stateExperiment),
		timestamp: Date.now(),
	};
}

/**
 * Gather the information of relative to the performance for a block fo Simple-Log format
 * @returns {Simple_Log_Block_Performance_Information}
 */
function makeSimpleLogBlockPerformanceInformation() {
	const blockType = gettersExperiment.currentStateType(stateExperiment);
	const controlType = gettersExperiment.controlType(stateExperiment);
	const performanceLog = {};

	switch (controlType) {
		case 'clicker':
		case 'piano':
			Object.assign(performanceLog, gettersPiano.pianoSimpleLogSummary(statePiano));
			Object.assign(performanceLog, gettersPiano.pianoSimpleLogPreprocesed(statePiano));
			break;
		case 'keyboard':
			Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogSummary(stateKeyboard));
			Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogPreprocesed(stateKeyboard));
			break;
		default:
			break;
	}

	// Include the grades if it's a feedback state or a playing state
	if (['playing', 'feedback'].includes(blockType))
	{
		// TODO: the 'grades' is kept for compatibility with previous data, but should be removed to only keep the 'unwoundgrades'.
		performanceLog.grades = gettersEvaluation.grades(stateEvaluation);
		Object.assign(performanceLog, gettersEvaluation.unwoundGrades(stateEvaluation));
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
		logLabel: targetLogLabel || gettersExperiment.logLabel(stateExperiment),
		logTags: gettersSession.tags(stateSession),

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
 *  - Thorough_Log_Block_Performance_Information (if the control type applies)
 *  - Log_Block_Survey_Answers (if the type was 'survey')
 *
 * @returns {Thorough_Log_Block}
 */
function makeThoroughLogBlock() {
	// Block construction helpers
	const blockType = gettersExperiment.currentStateType(stateExperiment);
	const controlType = gettersExperiment.controlType(stateExperiment);

	// Block construction
	const block = {};
	Object.assign(block, makeThoroughLogBlockGeneralInformation());
	if (controlType !== 'none') Object.assign(block, makeSimpleBlockPerformanceInformation());
	if (blockType === 'glt') Object.assign(block, makeLogBlockGltResults());
	if (blockType === 'pvt') Object.assign(block, makeLogBlockPvtResults());
	if (blockType === 'question') Object.assign(block, makeLogBlockQuestionAnswer());
	if (blockType === 'survey') Object.assign(block, makeLogBlockSurveyAnswers());
	if (blockType === 'writting') Object.assign(block, makeLogBlockWrittenAnswer());
	return block;
}

/**
 * Gather the information of relative to the performance for a block for Thorough-Log format
 * @returns {Thorough_Log_Block_General_Information}
 */
function makeThoroughLogBlockGeneralInformation() {
	return {
		associativeIdOrdinalNumber: gettersSession.associativeIdOrdinalNumber(stateSession) || 0,

		startCount: gettersSession.startCount(stateSession),

		blockType: gettersExperiment.currentStateType(stateExperiment),
		blockSubType: gettersExperiment.currentStateSubtype(stateExperiment),
		controlType: gettersExperiment.controlType(stateExperiment),
		index: gettersExperiment.currentIndex(stateExperiment),
		innerStepIndex: gettersExperiment.currentInnerStepIndex(stateExperiment),
		repetition: gettersExperiment.currentRepetition(stateExperiment),
		isInPrelude: gettersExperiment.isInPrelude(stateExperiment),
		isInConclusion: gettersExperiment.isInConclusion(stateExperiment),
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
	const blockType = gettersExperiment.currentStateType(stateExperiment);
	const controlType = gettersExperiment.controlType(stateExperiment);
	const performanceLog = {};

	// Include the piano information if the experiment had the piano control
	if (controlType === 'piano' || controlType === 'clicker') Object.assign(performanceLog, gettersPiano.pianoSimpleLogSummary(statePiano));
	if (controlType === 'piano' || controlType === 'clicker') Object.assign(performanceLog, gettersPiano.pianoSimpleLogPreprocesed(statePiano));

	// Systematically include the keyboard input
	Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogSummary(stateKeyboard));
	Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogPreprocesed(stateKeyboard));

	// Include the grades if it's a feedback state or a playing state
	if (['playing', 'feedback'].includes(blockType))
	{
		// TODO: the 'grades' is kept for compatibility with previous data, but should be removed to only keep the 'unwoundgrades'.
		performanceLog.grades = gettersEvaluation.grades(stateEvaluation);
		Object.assign(performanceLog, gettersEvaluation.unwoundGrades(stateEvaluation));
	}

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

/**
 * Gather the information of relative to the results of a survey for a log block of Simple-Log and Thorough-Log format
 * @returns {Log_Block_Survey_Answers}
 */
function makeLogBlockSurveyAnswers() {
	const surveyAnswers = {
		surveyAnswers: gettersSurvey.surveyAnswers(stateSurvey),
		isSurveyRadio: gettersSurvey.isSurveyRadio(stateSurvey),
		surveyOptions: gettersSurvey.surveyOptions(stateSurvey),
		surveyHeader: gettersSurvey.surveyHeader(stateSurvey),
		surveySideText: gettersSurvey.surveySideText(stateSurvey),
	};
	return surveyAnswers;
}

/**
 * Gather the information of a written input from a 'writting' state for a log block of Simple-Log and Thorough-Log format
 * @returns {Log_Block_Writting_Answer}
 */
function makeLogBlockWrittenAnswer() {
	const writtenAnswer = {
		writtenInput: gettersWritting.writtenInput(stateWritting),
		writtingMaxCharacters: gettersWritting.writtingMaxCharacters(stateWritting),
		writtingMinCharacters: gettersWritting.writtingMinCharacters(stateWritting),
		writtingIsNumber: gettersWritting.writtingIsNumber(stateWritting),
	};
	return writtenAnswer;
}

/**
 * Gather the information of a 'question' state for a log block of Simple-Log and Thorough-Log format
 * @returns {Log_Block_Question_Answer}
 */
 function makeLogBlockQuestionAnswer() {
	const questionAnswer = {
		questionAnswerIndex: gettersQuestion.questionAnswerIndex(stateQuestion),
		isQuestionAnswerCorrect: gettersQuestion.isQuestionAnswerCorrect(stateQuestion),
		questionCorrectAnswerIndex: gettersQuestion.questionCorrectAnswerIndex(stateQuestion),
		questionOptionsValues: gettersQuestion.questionOptionsValues(stateQuestion),
		questionOptionsTexts: gettersQuestion.questionOptionsTexts(stateQuestion),
		questionAsked: gettersQuestion.questionAsked(stateQuestion),
		questionRelatedContent: gettersQuestion.questionRelatedContent(stateQuestion),
	};
	return questionAnswer;
}

/**
 * Gather the information of a 'pvt' state for a log block of Simple-Log and Thorough-Log format
 * @returns {Log_Block_Pvt_Results}
 */
 function makeLogBlockPvtResults() {
	const pvtResults = {
		pvtStimuli: gettersPvt.pvtStimuli(statePvt),
		pvtInputTimes: gettersPvt.pvtInputTimes(statePvt),
		pvtReactionTimes: gettersPvt.pvtReactionTimes(statePvt),
		pvtReactionTooEarly: gettersPvt.pvtReactionTooEarly(statePvt),
		pvtMinTime: gettersPvt.pvtMinTime(statePvt),
		pvtMaxTime: gettersPvt.pvtMaxTime(statePvt),
		pvtCount: gettersPvt.pvtCount(statePvt),
		pvtHasCentralElement: gettersPvt.pvtHasCentralElement(statePvt),
		pvtReactionTimeAverage: gettersPvt.pvtReactionTimeAverage(statePvt),
	};
	return pvtResults;
}

/**
 * Gather the information of a 'glt' (grid-location-task) state for a log block of Simple-Log and Thorough-Log format
 * @returns {Log_Block_Grid_Location_Task_Results}
 */
 function makeLogBlockGltResults() {
	const gltResults = {
		numberImages: gettersGlt.numberImages(stateGlt),
		xMatrixDimension: gettersGlt.xMatrixDimension(stateGlt),
		yMatrixDimension: gettersGlt.yMatrixDimension(stateGlt),
		imagePositions: gettersGlt.imagePositions(stateGlt),
		tagetImage: gettersGlt.tagetImage(stateGlt),
		targetImagePosition: gettersGlt.targetImagePosition(stateGlt),
		timeToClick: gettersGlt.timeToClick(stateGlt),
		positionClicked: gettersGlt.positionClicked(stateGlt),
		imageAtPositionClicked: gettersGlt.imageAtPositionClicked(stateGlt),
		isAnswerRightList: gettersGlt.isAnswerRightList(stateGlt),
		interogationsCount: gettersGlt.interogationsCount(stateGlt),
		rightAnswersCount: gettersGlt.rightAnswersCount(stateGlt),
		reproductionSeed: gettersGlt.reproductionSeed(stateGlt),
		includesPresentation: gettersGlt.includesPresentation(stateGlt),
		includesTest: gettersGlt.includesTest(stateGlt),
	};
	return gltResults;
}
