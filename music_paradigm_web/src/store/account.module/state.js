import { defaultState } from '@/store-helper/account.module-helper';

export default {
	status: {
		loggingIn: false,
		loggedIn: false,
		isFetchingProgressionSummary: false,
	},
	user: defaultState.EMPTY_USER(),

	dueExperimentAssociativeId: '',
	dueExperimentAssociativeIdOrdinalNumber: 0,
	progressionSummary: defaultState.EMPTY_PROGRESSION_SUMMARY(),
};
