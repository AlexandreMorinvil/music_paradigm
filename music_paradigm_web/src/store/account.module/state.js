import constants from './constants';

export default {
	status: {
		loggingIn: false,
		loggedIn: false,
		isFetchingProgressionSummary: false,
	},
	user: constants.EMPTY_USER(),

	dueExperiment: '',
	progressionSummary: constants.EMPTY_PROGRESSION_SUMMARY(),
};
