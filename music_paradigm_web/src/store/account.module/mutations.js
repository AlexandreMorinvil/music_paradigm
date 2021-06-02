import constants from './constants';

export default {
	loginRequest(state) {
		Object.assign(state.status, { loggingIn: true });
	},

	loginSuccess(state, user) {
		state.user = user;
		Object.assign(state.status, { loggingIn: false, loggedIn: true });
	},

	loginFailure(state) {
		state.user = constants.EMPTY_USER();
		Object.assign(state.status, { loggingIn: false, loggedIn: false });
	},

	logout(state) {
		state.user = constants.EMPTY_USER();
		Object.assign(state.status, { loggedIn: false });
	},

	indicateFetchingProgressionSummary(state) {
		state.status.isFetchingProgressionSummary = true;
	},

	indicateFetchingProgressionSummaryEnd(state) {
		state.status.isFetchingProgressionSummary = false;
	},

	setDueExperiment(state, dueExperiment) {
		const { associativeId, associativeIdOrdinalNumber } = dueExperiment || {};
		state.dueExperimentAssociativeId = associativeId;
		state.dueExperimentAssociativeIdOrdinalNumber = associativeIdOrdinalNumber;
	},

	setProgressionSummary(state, progressionSummary) {
		state.progressionSummary = progressionSummary;
	},
};
