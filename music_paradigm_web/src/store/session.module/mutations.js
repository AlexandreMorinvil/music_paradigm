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

	setIsInitializingSession(state) {
		state.status.isInitializingSession = true;
	},

	setIsInitializingSessionEnd(state) {
		state.status.isInitializingSession = false;
	},

	setIsConcludingSession(state) {
		state.status.isConcludingSession = true;
	},

	setIsConcludingSessionEnd(state) {
		state.status.isConcludingSession = false;
	},

	setIsSavingSessionState(state) {
		state.status.isSavingSessionState = true;
	},

	setIsSavingSessionStateEnd(state) {
		state.status.isSavingSessionState = false;
	},

	setIsForgettingSessionState(state) {
		state.status.isForgettingSessionState = true;
	},

	setIsForgettingSessionStateEnd(state) {
		state.status.isForgettingSessionState = false;
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
