import constants from './constants';

export default {
	status: {
		isFetchingSession: false,
		isInitializingSession: false,
		isConcludingSession: false,
	},
	sessionInformation: constants.EMPTY_SESSION_INFORMATION(),
};
