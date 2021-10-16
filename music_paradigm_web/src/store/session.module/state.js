import { defaultState } from '@/store-helper/session.module-helper';

export default {
	status: {
		isFetchingSession: false,
		isInitializingSession: false,
		isConcludingSession: false,
		isSavingSessionState: false,
		isForgettingSessionState: false,
	},
	sessionInformation: defaultState.EMPTY_SESSION_INFORMATION(),
};
