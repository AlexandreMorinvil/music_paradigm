/* eslint-disable max-lines-per-function */
import { logService } from '@/_services';

export default {
	makeSimpleBlock({ rootGetters }) {
		return new Promise((resolve) => {
			const block = {
				userId: rootGetters['account/accountId'],
				experimentId: rootGetters['experiment/experimentId'],
				curriculumId: rootGetters['account/curriculumId'] || null,
				associativeId: rootGetters['session/associativeId'] || null,

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

	logAddSimmpleBlock({ commit, dispatch }) {
		dispatch('makeSimpleBlock').then((block) => {
			commit('indicateAddBlockRequest');
			return logService
				.addSimpleBlock(block)
				.then(
					(addedBlock) => {
						console.log(addedBlock);
					},
					(error) => {
						console.log(error);
					},
				)
				.finally(() => commit('indicateAddBlockRequestEnd'));
		});
	},

	// initializeLogSession({ commit, rootGetters }) {
	// 	const sessionLogHeader = {
	// 		userId: rootGetters['account/accountId'],
	// 		experimentId: rootGetters['experiment/experimentId'],
	// 		username: rootGetters['account/username'],
	// 		experimentGroup: rootGetters['experiment/experimentGroup'],
	// 		experimentName: rootGetters['experiment/experimentName'],
	// 		experimentVersion: rootGetters['experiment/experimentVersion'],
	// 		startTimestamp: Date.now(),
	// 	};
	// 	commit('indicateCreateRequest');
	// 	return logService
	// 		.createAdminSession(sessionLogHeader)
	// 		.then(
	// 			(initializedLogSession) => {
	// 				commit('setAdminLogSessionId', initializedLogSession);
	// 			},
	// 			(error) => {
	// 				console.log(error);
	// 			},
	// 		)
	// 		.finally(() => {
	// 			commit('indicateCreateRequestEnd');
	// 		});
	// },

	// addBlockToLogSession({ commit, getters, rootGetters }) {
	// 	const block = {
	// 		blockType: rootGetters['experiment/currentStateType'],
	// 		timestamp: Date.now(),
	// 		notes: rootGetters['piano/pianoLogSummary'],
	// 	};
	// 	commit('indicateAddBlockRequest');
	// 	return logService
	// 		.addBlock(getters.logSessionId, block)
	// 		.then(
	// 			(addedBlock) => {
	// 				console.log(addedBlock);
	// 			},
	// 			(error) => {
	// 				console.log(error);
	// 			},
	// 		)
	// 		.finally(() => {
	// 			commit('indicateAddBlockRequestEnd');
	// 		});
	// },
};
