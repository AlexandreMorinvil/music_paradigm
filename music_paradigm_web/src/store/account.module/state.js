import constants from './constants';

export default {
	status: {
		loggingIn: false,
		loggedIn: false,
		isFetchingProgressionSummary: false,
		isFetchingSession: false,
	},

	user: constants.EMPTY_USER(),

	dueExperiment: '',
	progressionSummary: constants.EMPTY_PROGRESSION_SUMMARY(),
	sessionInformation: constants.EMPTY_SESSION_INFORMATION(),
};
