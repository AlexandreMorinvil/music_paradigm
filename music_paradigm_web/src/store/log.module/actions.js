/* eslint-disable max-lines-per-function */
import { log } from '@/store-helper';
import { logService } from '@/_services';

export default {
	addSimmpleLogBlock({ commit }) {
		const block = log.makeSimpleLogBlock();
		commit('indicateAddBlockRequest');
		return logService
			.addSimpleLogBlock(block)
			.then(
				() => {
					// Nothing is done
				},
				(error) => {
					console.log(error);
				},
			)
			.finally(() => commit('indicateAddBlockRequestEnd'));
	},

	initializeThoroughLog({ commit }) {
		const logHeader = log.makeThoroughLogHeader();
		commit('indicateInitializeLogRequest');
		return logService
			.initializeThoroughLog(logHeader)
			.then(
				() => {
					// Nothing is done
				},
				(error) => {
					console.log(error);
				},
			)
			.finally(() => {
				commit('indicateInitializeLogRequestEnd');
			});
	},

	addThoroughLogBlock({ commit }) {
		const logHeader = log.makeThoroughLogHeader();
		const block = log.makeThoroughLogBlock();
		commit('indicateAddBlockRequest');
		return logService
			.addThoroughLogBlock(logHeader, block)
			.then(
				() => {
					// Nothing is done
				},
				(error) => {
					console.log(error);
				},
			)
			.finally(() => commit('indicateAddBlockRequestEnd'));
	},

	concludeThoroughLog({ commit }, { isInTimeUp, oldLogLabel, newLogLabel }) {
		const logHeader = log.makeThoroughLogHeader(oldLogLabel);
		const logConclusion = log.makeThoroughLogConclusion(isInTimeUp, newLogLabel);
		commit('indicateConcludeLogRequest');
		return logService
			.concludeThoroughLog(logHeader, logConclusion)
			.then(
				() => {
					// Nothing is done
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
