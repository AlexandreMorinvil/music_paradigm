export default {
	EMPTY_USER,
	EMPTY_PROGRESSION_SUMMARY,
};

function EMPTY_USER() {
	return {
		_id: null,
		username: '',
		email: '',
		firstName: '',
		middleName: '',
		lastName: '',
		role: '',
		curriculum: null,
		progressions: [],
	};
}

function EMPTY_PROGRESSION_SUMMARY() {
	return [
		{
			associativeId: '',
			associativeIdOrdinalNumber: 0,
			title: '',
			text: '',
			releaseTime: '',
			isUniqueIndDay: true,
			isCompletionLimited: true,

			completionCount: 0,

			delayPreAvailabilityInDays: 0,
			delayPreAvailabilityInHours: 0,
			isLockedByCompletionLimit: true,
			wouldBeFree: false,

			isDelayedByPreviousSequential: true,
			isDelayedByPreviousUniqueInDay: true,
			isAvailable: false,
		},
	];
}