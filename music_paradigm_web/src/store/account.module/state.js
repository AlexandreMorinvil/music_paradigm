export default {
	status: {
		loggingIn: false,
		loggedIn: false,
		isFetchingProgressionSummary: false,
	},

	user: {
		_id: null,
		username: '',
		email: '',
		firstName: '',
		middleName: '',
		lastName: '',
		role: '',
		curriculum: null,
		progressions: [],
	},

	dueExperiment: '',
	progressionSummary: [
		{
			associativeId: '',
			title: '',
			delayPreAvailabilityInDays: 0,
			delayPreAvailabilityInHours: 0,
			isLockedByCompletionLimit: true,
			wouldBeFree: false,
			isDelayedByPreviousSequential: false,
			isDelayedByPreviousUniqueInDay: false,
			isAvailable: false,
		},
	],
};
