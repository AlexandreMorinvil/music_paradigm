/* eslint-disable max-lines-per-function */
import { logApi } from '@/api';
import { logFormat } from '@/store-helper/log.module-helper';

export default {
	setLogType({ commit }, logType) {
		commit('setLogType', logType);
	},

	clearLogSpecifications({ commit }) {
		commit('clearLogSpecifications');
	},

	initializeThoroughLog({ commit }) {
		const logHeader = logFormat.makeThoroughLogHeader();
		commit('indicateInitializeLogRequest');
		return logApi
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
		return logApi
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
		return logApi
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
