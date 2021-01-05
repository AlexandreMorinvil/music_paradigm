import constants from './constants';

export default {
	isFetchingSession(state) {
		state.status.isFetchingSession = true;
	},

	isFetchingSessionEnd(state) {
		state.status.isFetchingSession = false;
	},

	setFetchedSession(state, sessionInformation) {
		state.sessionInformation = sessionInformation;
	},

	clearSessionInformation(state) {
		state.sessionInformation = constants.EMPTY_SESSION_INFORMATION();
	},
};
