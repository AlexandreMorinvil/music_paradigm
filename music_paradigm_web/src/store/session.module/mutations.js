import constants from './constants';
import { routerNavigation } from '@/_helpers';

export default {
	// Pre-session
	isFetchingSession(state) {
		state.status.isFetchingSession = true;
	},

	isFetchingSessionEnd(state) {
		state.status.isFetchingSession = false;
	},

	setFetchedSession(state, sessionInformation) {
		state.sessionInformation = sessionInformation;
	},

	goToPreSession() {
		routerNavigation.moveToPreSession();
	},

	leavePreSession() {
		routerNavigation.goToRootPage();
	},

	clearSessionInformation(state) {
		state.presSessionState = constants.PRE_SESSION_STATE();
		state.sessionInformation = constants.EMPTY_SESSION_INFORMATION();
	},
};
