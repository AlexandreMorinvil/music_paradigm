/* eslint-disable max-lines-per-function */
import { logFormat } from '@/store-helper/log.module-helper';
import { logService } from '@/_services';

export default {
	addSimmpleLogBlock({ commit }) {
		const block = logFormat.makeSimpleLogBlock();
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
		const logHeader = logFormat.makeThoroughLogHeader();
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
		const logHeader = logFormat.makeThoroughLogHeader();
		const block = logFormat.makeThoroughLogBlock();
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
		const logHeader = logFormat.makeThoroughLogHeader(oldLogLabel);
		const logConclusion = logFormat.makeThoroughLogConclusion(isInTimeUp, newLogLabel);
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
