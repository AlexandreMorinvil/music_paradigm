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

// Simple log

function makeSimpleLogBlock() {
	const block = {};
	Object.assign(block, makeSimpleLogBlockGeneralInformation());
	Object.assign(block, makeSimpleLogBlockPerformanceInformation());
	return block;
}

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

// Thorough Log

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

function makeThoroughLogBlock() {
	const block = {};
	Object.assign(block, makeThoroughLogBlockGeneralInformation());
	Object.assign(block, makeSimpleBlockPerformanceInformation());
	return block;
}

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

function makeSimpleBlockPerformanceInformation() {
	const performanceLog = {};
	Object.assign(performanceLog, gettersPiano.pianoSimpleLogSummary(statePiano));
	Object.assign(performanceLog, gettersPiano.pianoSimpleLogPreprocesed(statePiano));
	Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogSummary(stateKeyboard));
	Object.assign(performanceLog, gettersKeyboard.keyboardSimpleLogPreprocesed(stateKeyboard));
	return performanceLog;
}

function makeThoroughLogConclusion(isInTimeUp = false, newLogLabel) {
	return {
		time: Date.now(),
		isInTimeUp: isInTimeUp,
		nextLogLabel: newLogLabel,
	};
}
