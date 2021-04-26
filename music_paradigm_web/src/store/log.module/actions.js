/* eslint-disable max-lines-per-function */
import { logService } from '@/_services';

export default {
	makeSimpleBlock({ rootGetters }) {
		return new Promise((resolve) => {
			const block = {
				userId: rootGetters['account/accountId'],
				curriculumId: rootGetters['session/curriculumId'] || null,
				associativeId: rootGetters['session/associativeId'] || null,
				experimentId: rootGetters['experiment/experimentId'],

				username: rootGetters['account/username'],
				curriculumTitle: rootGetters['session/curriculumTitle'] || null,
				experimentGroup: rootGetters['experiment/experimentGroup'],
				experimentName: rootGetters['experiment/experimentName'],
				experimentVersion: rootGetters['experiment/experimentVersion'],

				blockType: rootGetters['experiment/currentStateType'],
				blockSubType: rootGetters['experiment/playingMode'],
				controlType: rootGetters['experiment/controlType'],
				index: rootGetters['experiment/currentIndex'],
				innerStepIndex: rootGetters['experiment/currentInnerStepIndex'],
				repetition: rootGetters['experiment/currentRepetition'],
				timestamp: Date.now(),
			};

			const controlType = rootGetters['experiment/controlType'];
			const performanceLog = {};
			switch (controlType) {
				case 'piano':
					Object.assign(performanceLog, rootGetters['piano/pianoSimpleLogSummary']);
					Object.assign(performanceLog, rootGetters['piano/pianoSimpleLogPreprocesed']);
					performanceLog.grades = rootGetters['evaluation/grades'];
					break;
				case 'keyboard':
					Object.assign(performanceLog, rootGetters['keyboard/keyboardSimpleLogSummary']);
					Object.assign(performanceLog, rootGetters['keyboard/keyboardSimpleLogPreprocesed']);
					break;
				default:
					break;
			}

			Object.assign(block, performanceLog);
			resolve(block);
		});
	},

	addSimmpleLogBlock({ commit, dispatch }) {
		dispatch('makeSimpleBlock').then((block) => {
			commit('indicateAddBlockRequest');
			return logService
				.addSimpleLogBlock(block)
				.then(
					(addedBlock) => {
						// console.log(addedBlock);
					},
					(error) => {
						console.log(error);
					},
				)
				.finally(() => commit('indicateAddBlockRequestEnd'));
		});
	},

	initializeThoroughLog({ commit, rootGetters }) {
		const logHeader = {
			userId: rootGetters['account/accountId'],
			curriculumId: rootGetters['session/curriculumId'] || null,
			associativeId: rootGetters['session/associativeId'] || null,
			experimentId: rootGetters['experiment/experimentId'],

			username: rootGetters['account/username'],
			curriculumTitle: rootGetters['session/curriculumTitle'] || null,
			experimentGroup: rootGetters['experiment/experimentGroup'],
			experimentName: rootGetters['experiment/experimentName'],
			experimentVersion: rootGetters['experiment/experimentVersion'],
			startTimestamp: Date.now(),
		};
		commit('indicateInitializeLogRequest');
		return logService
			.initializeThoroughLog(logHeader)
			.then(
				(logId) => {
					commit('setLogId', logId);
				},
				(error) => {
					console.log(error);
				},
			)
			.finally(() => {
				commit('indicateInitializeLogRequestEnd');
			});
	},

	makeThoroughLogBlock({ rootGetters }) {
		return new Promise((resolve) => {
			const block = {
				blockType: rootGetters['experiment/currentStateType'],
				blockSubType: rootGetters['experiment/playingMode'],
				controlType: rootGetters['experiment/controlType'],
				index: rootGetters['experiment/currentIndex'],
				innerStepIndex: rootGetters['experiment/currentInnerStepIndex'],
				repetition: rootGetters['experiment/currentRepetition'],
				timestamp: Date.now(),

				textContent: rootGetters['experiment/textContent'],
				pictureName: rootGetters['experiment/pictureName'],
				helperImageName: rootGetters['experiment/helperImageName'],
			};
			Object.assign(block, rootGetters['piano/pianoSimpleLogSummary']);
			Object.assign(block, rootGetters['piano/pianoSimpleLogPreprocesed']);
			Object.assign(block, rootGetters['keyboard/keyboardSimpleLogSummary']);
			Object.assign(block, rootGetters['keyboard/keyboardSimpleLogPreprocesed']);

			resolve(block);
		});
	},

	addThoroughLogBlock({ commit, dispatch, getters }) {
		dispatch('makeThoroughLogBlock').then((block) => {
			commit('indicateAddBlockRequest');
			return logService
				.addThoroughLogBlock(getters.logId, block)
				.then(
					() => {
						console.log('Log block added');
					},
					(error) => {
						console.log(error);
					},
				)
				.finally(() => commit('indicateAddBlockRequestEnd'));
		});
	},

	concludeThoroughLog({ commit, getters }) {
		const logConclusion = {
			startTimestamp: Date.now(),
		};
		commit('indicateConcludeLogRequest');
		return logService
			.concludeThoroughLog(getters.logId, logConclusion)
			.then(
				() => {
					console.log('Log concluded');
				},
				(error) => {
					console.log(error);
				},
			)
			.finally(() => {
				commit('indicateConcludeLogRequestEnd');
			});
	},
};
