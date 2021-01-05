import constants from './constants';
import { routerNavigation } from '@/_helpers';

export default {
	isFetchingSession(state) {
		state.status.isFetchingSession = true;
	},

	isFetchingSessionEnd(state) {
		state.status.isFetchingSession = false;
	},

	goToPreSession() {
		routerNavigation.moveToPreSession();
	},

	setFetchedSession(state, sessionInformation) {
		state.sessionInformation = sessionInformation;
	},

	clearSessionInformation(state) {
		state.sessionInformation = constants.EMPTY_SESSION_INFORMATION();
	},
};
