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

	isFetchingSession(state) {
		state.status.isFetchingSession = true;
	},

	isFetchingSessionEnd(state) {
		state.status.isFetchingSession = false;
	},

	setDueExperiment(state, dueExperiment) {
		state.dueExperiment = dueExperiment;
	},

	setProgressionSummary(state, progressionSummary) {
		state.progressionSummary = progressionSummary;
	},

	setFetchedSession(state, sessionInformation) {
		state.sessionInformation = sessionInformation;
	},

	clearSessionInformation(state) {
		state.sessionInformation = constants.EMPTY_SESSION_INFORMATION();
	},
};
