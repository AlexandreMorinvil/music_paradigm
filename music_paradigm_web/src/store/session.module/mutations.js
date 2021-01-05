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

	endPresessionMessage(state) {
		state.presSessionState.hasHadMessage = true;
	},

	endPresessionAdvice(state) {
		state.presSessionState.hasHadAdvice = true;
	},

	endPresessionPiano(state) {
		state.presSessionState.hasHadPiano = true;
	},

	clearSessionInformation(state) {
		state.presSessionState = constants.PRE_SESSION_STATE();
		state.sessionInformation = constants.EMPTY_SESSION_INFORMATION();
	},
};
